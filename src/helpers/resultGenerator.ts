import { Call } from '../types/calls';
import { Composition } from '../types/compositions';
import { Method } from '../types/methods';
import { LeadResult, Result } from '../types/results';
import { plainCall } from './callHelper';
import assertUnreachable from './contextHelper';
import { getMusicalChanges, getPlaceNotation, getTruth } from './resultHelper';
import {
  getStageNumber, getInitialChange, getTenorIndexFromPosition, getStageCharacter,
} from './stageHelper';
import {
  getCompositionDetail, getExpandedComposition, splitNumericElement, splitPositionalElement,
} from './compositionHelper';

class ResultGenerator {
  private readonly methods: Method[];

  private readonly calls: Call[];

  private readonly composition: Composition;

  private readonly expandedComp: string[];

  private rounds: string;

  private currentChange: string;

  private currentMethod: Method;

  private halfLeadNext: boolean = true;

  private leadCount: number = 1;

  private highestMethodStage : number;

  private changesOfMethod: number;

  private courseEnds: string[] = [];

  constructor(methods: Method[], calls: Call[], composition: Composition) {
    this.methods = methods;
    this.calls = calls;
    this.composition = composition;
    this.rounds = getInitialChange(this.composition.numberOfBells);
    this.currentChange = this.rounds;
    this.expandedComp = this.getCompositionArray();
    this.currentMethod = this.getInitialMethod();
    this.highestMethodStage = this.currentMethod.stage;
    this.changesOfMethod = 0;
  }

  private getCompositionArray = (): string[] => {
    const compositionDetail = getCompositionDetail(this.composition);
    if (!compositionDetail) { throw new Error(`No composition detail provided for type ${this.composition.type}`); }
    const expandedComposition = getExpandedComposition(compositionDetail);

    return expandedComposition.split('.').filter((x) => x);
  };

  private getMethodFromAbbr = (methodAbbr: string | undefined): Method => {
    const method = this.methods.find((m) => m.abbreviation === methodAbbr);
    if (!method) { throw new Error(`"${methodAbbr}" is not a valid method.`); }
    return method;
  };

  private getInitialMethod = (): Method => {
    switch (this.composition.type) {
      case 'Numerical':
      case 'Positional':
        return this.getMethodFromAbbr(this.composition.startingMethod);
      case 'Full': {
        const methodAbbr = this.expandedComp[0].substr(0, this.expandedComp[0].length - 1);
        return this.getMethodFromAbbr(methodAbbr);
      }
      default:
        return assertUnreachable(this.composition.type);
    }
  };

  private generateNextRow = (placeNotation: string, stage: number): void => {
    const rowArray = Array.from(this.currentChange);
    const placeNotationArray = Array.from(placeNotation).filter((n) => n !== '-');
    const nextChange: string[] = [];

    // for each non cross item in the notation we make a place
    placeNotationArray.forEach((element) => {
      const position = getStageNumber(element);
      if (position > stage) {
        throw new Error(`Place Notation "${placeNotation}" contains an invalid expression.`);
      }
      nextChange[position - 1] = rowArray[position - 1];
    });

    // go backwards through the previous row and put all cover bells in place,
    // cross all possible pairs, make places where forced
    for (let i = rowArray.length - 1; i >= 0; i -= 1) {
      // If it already has a value ignore it
      // if it has a neigbour with no value switch it, else keep it as it was
      if (!nextChange[i]) {
        if (i >= stage) {
          nextChange[i] = rowArray[i]; // cover bells
        } else if (i > 0 && !nextChange[i - 1]) {
          nextChange[i] = rowArray[i - 1]; // need swapping
          nextChange[i - 1] = rowArray[i];
        } else {
          nextChange[i] = rowArray[i]; // forced places
        }
      }
    }

    this.currentChange = nextChange.join('');
  };

  private getLeadCall = (callAbbr: string, { defaultBob, defaultSingle, stage }: Method): Call => {
    let call: Call | undefined;

    if (callAbbr === 'p') { return plainCall; }

    if (callAbbr === 'b' && defaultBob) {
      call = this.calls.find((c) => c.abbreviation === defaultBob && c.stage === stage);
    } else if (callAbbr === 's' && defaultSingle) {
      call = this.calls.find((c) => c.abbreviation === defaultSingle && c.stage === stage);
    } else {
      call = this.calls.find((c) => c.abbreviation === callAbbr && c.stage === stage);
    }

    if (!call) { throw new Error(`"${callAbbr}" is not a valid call.`); }
    return call;
  };

  private generateNextLead = (
    callAbbr: string, possibleLastLead: boolean,
  ): LeadResult => {
    const call = this.getLeadCall(callAbbr, this.currentMethod);

    // get the place notation for the next lead (or half lead)
    const [placeNotation, callIndex] = getPlaceNotation(
      this.composition.halfLead, this.halfLeadNext, this.currentMethod, call,
    );
    const leadRows: string[] = [];
    let finishedEarly = false;

    for (let i = 0; i < placeNotation.length; i += 1) {
      this.generateNextRow(placeNotation[i], this.currentMethod.stage);
      leadRows.push(this.currentChange);

      // if it comes round in the last lead before the end stop calculating - it's a snap finish
      if (possibleLastLead
        && this.currentChange === this.rounds
        && i !== placeNotation.length - 1
      ) {
        finishedEarly = true;
        break;
      }
    }

    // half lead will switch if using it
    if (this.composition.halfLead) { this.halfLeadNext = !this.halfLeadNext; }

    return {
      call: callAbbr,
      callIndex,
      method: this.currentMethod.abbreviation,
      leadEnd: finishedEarly ? `(${this.currentChange})` : this.currentChange,
      rows: leadRows,
    };
  };

  private generateFullElement = (
    compositionElement: string, lastElement: boolean,
  ): LeadResult[] => {
    // in the composition type, each element is a lead or half lead
    const callAbbr = compositionElement.substr(compositionElement.length - 1);
    const methodAbbr = compositionElement.substr(0, compositionElement.length - 1);
    const method = this.getMethodFromAbbr(methodAbbr);

    // check for changes of methods and update stats accordingly
    if (method.abbreviation !== this.currentMethod.abbreviation) { this.changesOfMethod += 1; }
    if (method.stage > this.highestMethodStage) { this.highestMethodStage = method.stage; }

    this.currentMethod = method;
    const leadEnd = this.generateNextLead(callAbbr, lastElement);
    this.checkForCourseEnd();

    return [leadEnd];
  };

  private generatePosition = (
    tenorChar:string, expectedTenorIndex: number, callAbbr: string, lastElement: boolean,
  ) => {
    const leadResults: LeadResult[] = [];
    const loopStartChange: string = this.currentChange;

    do {
      const leadStartChange: string = this.currentChange;
      const leadEndWithCall = this.generateNextLead(callAbbr, lastElement);

      // if the generated lead gives the right tenor position then great
      if (this.currentChange.indexOf(tenorChar) === expectedTenorIndex) {
        leadResults.push(leadEndWithCall);
        this.checkForCourseEnd();
        return leadResults;
      }

      // otherwise go back and generate without the call and loop
      this.currentChange = leadStartChange;
      leadResults.push(this.generateNextLead('p', false));
      this.checkForCourseEnd();
    }
    while (loopStartChange !== this.currentChange);

    throw new Error(`Loop encountered, tenor does not return to position ${expectedTenorIndex + 1}`);
  };

  private generatePositionalElement = (
    compositionElement: string, lastElementOfPart: boolean, lastElement: boolean,
  ): LeadResult[] => {
    const [callPosition, callAbbr, numberOfCalls] = splitPositionalElement(compositionElement);
    const leadResults: LeadResult[] = [];

    // get where we expect the tenor to end up at the next call
    const expectedTenorIndex = getTenorIndexFromPosition(callPosition, this.currentMethod.stage);
    const tenorChar = getStageCharacter(this.currentMethod.stage);

    // run the generation for the number of times the position is called.
    for (let i = 0; i < numberOfCalls; i += 1) {
      leadResults.push(
        ...this.generatePosition(tenorChar, expectedTenorIndex, callAbbr, lastElement),
      );
    }

    if (lastElement) { leadResults.push(...this.continueToRounds()); }
    if (lastElementOfPart && !lastElement) { leadResults.push(...this.continueToCourseEnd()); }

    return leadResults;
  };

  private continueToRounds = (): LeadResult[] => {
    const leadResults: LeadResult[] = [];
    const loopStartChange: string = this.currentChange;
    // check if we are already in rounds
    if (this.currentChange === this.rounds) { return leadResults; }

    do {
      leadResults.push(this.generateNextLead('p', true));
      if (this.currentChange === this.rounds) { break; }
    }
    while (loopStartChange !== this.currentChange);
    this.checkForCourseEnd();

    // even if we don't find rounds just return with a plain course at the end
    return leadResults;
  };

  private checkForCourseEnd = () => {
    const expectedTenorIndex = getTenorIndexFromPosition('H', this.currentMethod.stage);
    const tenorChar = getStageCharacter(this.currentMethod.stage);
    const courseEnd = this.currentChange.indexOf(tenorChar) === expectedTenorIndex;

    if (courseEnd) { this.courseEnds.push(this.currentChange); }
    return courseEnd;
  };

  private continueToCourseEnd = () => {
    // check if we are already at a course end
    if (this.checkForCourseEnd()) {
      this.leadCount = 1;
      return [];
    }

    // going to course end is just generating a home using plain calls
    // ensure we are not using half leads while looking for a course end
    const currentHalfLead = this.composition.halfLead;

    this.composition.halfLead = false;
    const leadResults = this.generatePositionalElement('pH', false, false);
    this.composition.halfLead = currentHalfLead;

    this.leadCount = 1;
    return leadResults;
  };

  private generateNumericElement = (
    numericElement: string, lastElementOfPart: boolean, lastElement: boolean,
  ): LeadResult[] => {
    const leadResults: LeadResult[] = [];
    const [position, callAbbr, courseEnd] = splitNumericElement(numericElement);
    if (position < this.leadCount) { leadResults.push(...this.continueToCourseEnd()); }

    // loop till the call position
    let loopStartChange: string = this.currentChange;
    do {
      const call = this.leadCount === position ? callAbbr : 'p';
      const possibleLast = this.leadCount === position ? lastElement : false;

      leadResults.push(this.generateNextLead(call, possibleLast));
      this.leadCount += 1;
    }
    while (this.leadCount <= position && loopStartChange !== this.currentChange);

    // if we have a course end loop until that then reset lead counter
    if (courseEnd && this.leadCount <= courseEnd) {
      loopStartChange = this.currentChange;
      do {
        const possibleLast = this.leadCount === courseEnd ? lastElement : false;
        leadResults.push(this.generateNextLead('p', possibleLast));
        this.leadCount += 1;
      }
      while (this.leadCount <= courseEnd && loopStartChange !== this.currentChange);
      this.leadCount = 1;
      this.courseEnds.push(this.currentChange);
    }

    if (lastElementOfPart && !courseEnd) { leadResults.push(...this.continueToCourseEnd()); }
    if (lastElement && !courseEnd) { leadResults.push(...this.continueToRounds()); }

    return leadResults;
  };

  private generateCompElement = (
    element: string, lastElementOfPart: boolean, lastElement: boolean,
  ): LeadResult[] => {
    switch (this.composition.type) {
      case 'Full':
        return this.generateFullElement(element, lastElement);
      case 'Numerical':
        return this.generateNumericElement(element, lastElementOfPart, lastElement);
      case 'Positional':
        // don't support positional comps with half lead calls
        this.composition.halfLead = false;
        return this.generatePositionalElement(element, lastElementOfPart, lastElement);
      default:
        return assertUnreachable(this.composition.type);
    }
  };

  private generatePart = (lastPart: boolean) => {
    const compLen = this.expandedComp.length;
    const leadResults: LeadResult[] = [];

    this.expandedComp.forEach((element, index) => {
      const lastElementOfPart = index === compLen - 1;
      const lastElement = lastPart && lastElementOfPart;
      leadResults.push(...this.generateCompElement(element, lastElementOfPart, lastElement));
    });

    return leadResults;
  };

  calculateResult = (onComplete: (result: Result) => void) => {
    const partEnds: string[] = [];
    const leads: LeadResult[] = [];

    for (let part = 1; part <= this.composition.parts; part += 1) {
      const lastPart = part === this.composition.parts;
      leads.push(...this.generatePart(lastPart));
      partEnds.push(this.currentChange);
    }

    const grid = leads.flatMap((l) => l.rows);
    const result: Result = {
      leads,
      grid,
      courseEnds: this.courseEnds,
      partEnds,
      numberOfChanges: grid.length,
      changesOfMethod: this.changesOfMethod,
      truth: getTruth(this.highestMethodStage, grid),
      musicalChanges: getMusicalChanges(this.highestMethodStage, grid),
      initialChange: this.rounds,
    };

    onComplete(result);
  };
}

export default ResultGenerator;

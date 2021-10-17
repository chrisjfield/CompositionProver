import { Composition } from '../types/compositions';
import { Method } from '../types/methods';
import { PartialBy } from '../types/PartialExtensions';
import { getStageNotationRegex } from './stageHelper';
import methodsXml from '../data/methodsList';

type PartialMethod = PartialBy<Method, 'defaultBob' | 'defaultSingle'>;

export const newMethod = (method: PartialMethod) : Method => ({
  defaultBob: 'b',
  defaultSingle: 's',
  ...method,
});

const processMethods = (stage: number, methods: Element[]) => methods.map((m) => {
  const methodName = String(m.getElementsByTagName('title')[0].childNodes[0].nodeValue);
  const methodPlaceNotation = String(m.getElementsByTagName('notation')[0].childNodes[0].nodeValue);
  const methodAbbreviation = String(methodName.replace(/[^a-z0-9+]+/gi, '')).substring(0, 3) + stage.toString();

  return {
    name: methodName,
    abbreviation: methodAbbreviation,
    stage,
    placeNotation: methodPlaceNotation.toUpperCase(),
    defaultBob: 'b',
    defaultSingle: 's',
  };
});

export const getMethodListForStage = (stage: number) => {
  const xmlParser = new DOMParser();
  const methodSets = Array.from(xmlParser
    .parseFromString(methodsXml, 'text/xml')
    .getElementsByTagName('methodSet'));

  const methods = methodSets
    .filter((ms) => Number(ms.getElementsByTagName('stage')[0].childNodes[0].nodeValue) === stage)
    .flatMap((ms) => Array.from(ms.getElementsByTagName('method')));

  return processMethods(stage, methods);
};

export const isValidMethodNotation = (stage: number, notation: string) => {
  // regex allows multiple commas so check this is not the case
  if (notation.split(',').length > 2) { return false; }

  const stageRegex = getStageNotationRegex(stage);
  const validNotationRegex = RegExp(`^\\-$|^[\\-]?${stageRegex}{1}([\\.\\-\\,]{1}${stageRegex})*$`);
  return validNotationRegex.test(notation);
};

export const getMethodAbbreviationRegex = (methods: Method[]) => {
  if (!methods || methods.length === 0) { throw new Error('No methods found'); }

  return methods
    .map((m) => String(m.abbreviation))
    .reduce((prev, next) => `${prev}|${next}`);
};

export const sortMethods = (methodA: Method, methodB: Method) => {
  if (methodA.stage < methodB.stage) { return 1; }
  if (methodA.stage === methodB.stage && methodA.name > methodB.name) { return 1; }
  return -1;
};

export const methodValidForStage = (methods: Method[], composition: Composition) => {
  const method = methods.find((m) => m.abbreviation === composition.startingMethod);
  return !(!method || method.stage > composition.numberOfBells);
};

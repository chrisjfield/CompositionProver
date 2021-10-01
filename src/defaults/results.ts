import { Result, ResultHelper, ResultsSetting } from '../types/results';

export const emptyResult: Result = {
  changesOfMethod: 0,
  courseEnds: [],
  grid: [],
  leads: [],
  musicalChanges: {
    littleBellsBack: 0,
    littleBellsFront: 0,
    queens: 0,
    rollupsBack: 0,
    rollupsFront: 0,
    tittums: 0,
  },
  numberOfChanges: 0,
  partEnds: [],
  truth: {
    firstFalseRow: '',
    true: true,
    comesRound: false,
  },
  initialChange: '',
};

export const emptyResultHelper: ResultHelper = {
  result: emptyResult,
  currentChange: '',
  expandedComposition: '',
  highestMethodStage: 0,
  baseMethod: '',
  currentMethod: '',
  halfLeadsOn: false,
  halfLeadNext: false,
  courseLeadCounter: 1,
};

export const defaultResultSettings: ResultsSetting = {
  showSections: false,
  showGrid: false,
  showTreble: true,
};
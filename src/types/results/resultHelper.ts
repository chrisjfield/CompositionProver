import Result from './result';

interface ResultHelper {
  result: Result;
  highestMethodStage: number;
  currentChange: string;
  expandedComposition: string;
  halfLeadsOn: boolean;
  halfLeadNext: boolean;
  baseMethod: string;
  currentMethod: string;
  courseLeadCounter: number;
}

export default ResultHelper;

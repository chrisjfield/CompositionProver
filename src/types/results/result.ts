import LeadResult from './leadResult';
import Truth from './truth';
import MusicalChanges from './musicalChanges';

interface Result {
  leads: LeadResult[];
  grid: string[];
  courseEnds: string[];
  partEnds: string[];
  numberOfChanges: number;
  changesOfMethod: number;
  truth: Truth;
  musicalChanges: MusicalChanges;
  initialChange: string;
}

export default Result;

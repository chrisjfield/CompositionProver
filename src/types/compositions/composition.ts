import NewComposition from './newComposition';

interface Composition extends NewComposition {
  id: number;
  startingMethod?: string;
  composition?: string;
  changes?: number;
}

export default Composition;

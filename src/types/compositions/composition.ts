import NewComposition from './newComposition';

interface Composition extends NewComposition {
  id: number;
  startingMethod?: string;
  fullComposition?: string;
  numericalComposition?: string;
  positionalComposition?: string;
  changes?: number;
}

export default Composition;

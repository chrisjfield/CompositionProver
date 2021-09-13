import CompositionType from './compositionType';

interface NewComposition {
  name: string;
  numberOfBells: number;
  type: CompositionType;
  parts: number;
  halfLead: boolean;
}

export default NewComposition;

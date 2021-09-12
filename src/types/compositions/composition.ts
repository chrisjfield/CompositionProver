import CompositionType from './compositionType';

interface Composition {
  numberOfBells: number;
  type: CompositionType;
  parts: number;
  halfLead: boolean;
  startingMethod?: string;
  composition?: string;
}

export default Composition;

interface Call {
  name: string;
  abbreviation: string;
  stage: number;
  leadEndPlaceNotation: string;
  halfLeadPlaceNotation: string;
  editable: boolean;
}

export type CallProperty = 'leadEndPlaceNotation' | 'halfLeadPlaceNotation';

export default Call;

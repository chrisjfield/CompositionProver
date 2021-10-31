import { Call } from '../../../types/calls';

const mockCalls: Call[] = [
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 6, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '36',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 6, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '3456',
  },
  {
    name: 'Grandsire Bob', abbreviation: 'g', editable: false, stage: 7, leadEndPlaceNotation: '3.1', halfLeadPlaceNotation: '',
  },
  {
    name: 'Grandsire Single', abbreviation: 'h', editable: false, stage: 7, leadEndPlaceNotation: '3.13', halfLeadPlaceNotation: '',
  },
  {
    name: 'Stedman Bob', abbreviation: 'm', editable: false, stage: 7, leadEndPlaceNotation: '5.1.3.1', halfLeadPlaceNotation: '5.3.1.3',
  },
  {
    name: 'Stedman Single', abbreviation: 'n', editable: false, stage: 7, leadEndPlaceNotation: '567.1.3.1', halfLeadPlaceNotation: '567.3.1.3',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 8, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '58',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 8, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '5678',
  },
];

export default mockCalls;

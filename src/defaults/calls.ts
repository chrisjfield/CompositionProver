import Call from '../types/calls';

const defaultCalls: Call[] = [
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 5, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '25',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 6, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '36',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 7, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '47',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 8, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '58',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 9, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '69',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 10, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '70',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 11, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '8E',
  },
  {
    name: 'Bob (4ths place)', abbreviation: 'b', editable: false, stage: 12, leadEndPlaceNotation: '14', halfLeadPlaceNotation: '9T',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 7, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '27',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 8, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '38',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 9, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '49',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 10, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '50',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 11, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '6E',
  },
  {
    name: 'Bob (6ths place)', abbreviation: 'c', editable: false, stage: 12, leadEndPlaceNotation: '16', halfLeadPlaceNotation: '7T',
  },
  {
    name: 'Bob (8ths place)', abbreviation: 'd', editable: false, stage: 9, leadEndPlaceNotation: '18', halfLeadPlaceNotation: '29',
  },
  {
    name: 'Bob (8ths place)', abbreviation: 'd', editable: false, stage: 10, leadEndPlaceNotation: '18', halfLeadPlaceNotation: '30',
  },
  {
    name: 'Bob (8ths place)', abbreviation: 'd', editable: false, stage: 11, leadEndPlaceNotation: '18', halfLeadPlaceNotation: '4E',
  },
  {
    name: 'Bob (8ths place)', abbreviation: 'd', editable: false, stage: 12, leadEndPlaceNotation: '18', halfLeadPlaceNotation: '5T',
  },
  {
    name: 'Bob (10ths place)', abbreviation: 'e', editable: false, stage: 11, leadEndPlaceNotation: '10', halfLeadPlaceNotation: '2E',
  },
  {
    name: 'Bob (10ths place)', abbreviation: 'e', editable: false, stage: 12, leadEndPlaceNotation: '10', halfLeadPlaceNotation: '3T',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 6, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '3456',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 7, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '4567',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 8, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '5678',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 9, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '6789',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 10, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '7890',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 11, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '890E',
  },
  {
    name: 'Single (1-4)', abbreviation: 's', editable: false, stage: 12, leadEndPlaceNotation: '1234', halfLeadPlaceNotation: '90ET',
  },
  {
    name: 'Single (1-6)', abbreviation: 't', editable: false, stage: 8, leadEndPlaceNotation: '123456', halfLeadPlaceNotation: '345678',
  },
  {
    name: 'Single (1-6)', abbreviation: 't', editable: false, stage: 9, leadEndPlaceNotation: '123456', halfLeadPlaceNotation: '456789',
  },
  {
    name: 'Single (1-6)', abbreviation: 't', editable: false, stage: 10, leadEndPlaceNotation: '123456', halfLeadPlaceNotation: '567890',
  },
  {
    name: 'Single (1-6)', abbreviation: 't', editable: false, stage: 11, leadEndPlaceNotation: '123456', halfLeadPlaceNotation: '67890E',
  },
  {
    name: 'Single (1-6)', abbreviation: 't', editable: false, stage: 12, leadEndPlaceNotation: '123456', halfLeadPlaceNotation: '7890ET',
  },
  {
    name: 'Single (1-8)', abbreviation: 'u', editable: false, stage: 10, leadEndPlaceNotation: '12345678', halfLeadPlaceNotation: '34567890',
  },
  {
    name: 'Single (1-8)', abbreviation: 'u', editable: false, stage: 11, leadEndPlaceNotation: '12345678', halfLeadPlaceNotation: '4567890E',
  },
  {
    name: 'Single (1-8)', abbreviation: 'u', editable: false, stage: 12, leadEndPlaceNotation: '12345678', halfLeadPlaceNotation: '567890ET',
  },
  {
    name: 'Single (1-0)', abbreviation: 'v', editable: false, stage: 12, leadEndPlaceNotation: '1234567890', halfLeadPlaceNotation: '34567890ET',
  },
  {
    name: 'Grandsire Bob', abbreviation: 'g', editable: false, stage: 5, leadEndPlaceNotation: '3.1',
  },
  {
    name: 'Grandsire Bob', abbreviation: 'g', editable: false, stage: 7, leadEndPlaceNotation: '3.1',
  },
  {
    name: 'Grandsire Bob', abbreviation: 'g', editable: false, stage: 9, leadEndPlaceNotation: '3.1',
  },
  {
    name: 'Grandsire Bob', abbreviation: 'g', editable: false, stage: 11, leadEndPlaceNotation: '3.1',
  },
  {
    name: 'Grandsire Single', abbreviation: 'h', editable: false, stage: 5, leadEndPlaceNotation: '3.13',
  },
  {
    name: 'Grandsire Single', abbreviation: 'h', editable: false, stage: 7, leadEndPlaceNotation: '3.13',
  },
  {
    name: 'Grandsire Single', abbreviation: 'h', editable: false, stage: 9, leadEndPlaceNotation: '3.13',
  },
  {
    name: 'Grandsire Single', abbreviation: 'h', editable: false, stage: 11, leadEndPlaceNotation: '3.13',
  },
  {
    name: 'Stedman Bob', abbreviation: 'm', editable: false, stage: 7, leadEndPlaceNotation: '5.1.3.1', halfLeadPlaceNotation: '5.3.1.3',
  },
  {
    name: 'Stedman Bob', abbreviation: 'm', editable: false, stage: 9, leadEndPlaceNotation: '7.1.3.1', halfLeadPlaceNotation: '7.3.1.3',
  },
  {
    name: 'Stedman Bob', abbreviation: 'm', editable: false, stage: 11, leadEndPlaceNotation: '9.1.3.1', halfLeadPlaceNotation: '9.3.1.3',
  },
  {
    name: 'Stedman Single', abbreviation: 'n', editable: false, stage: 7, leadEndPlaceNotation: '567.1.3.1', halfLeadPlaceNotation: '567.3.1.3',
  },
  {
    name: 'Stedman Single', abbreviation: 'n', editable: false, stage: 9, leadEndPlaceNotation: '789.1.3.1', halfLeadPlaceNotation: '789.3.1.3',
  },
  {
    name: 'Stedman Single', abbreviation: 'n', editable: false, stage: 11, leadEndPlaceNotation: '90E.1.3.1', halfLeadPlaceNotation: '90E.3.1.3',
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 5,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 6,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 7,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 8,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 9,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 10,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 11,
  },
  {
    name: 'User Defined Call 1', abbreviation: 'w', editable: true, stage: 12,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 5,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 6,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 7,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 8,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 9,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 10,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 11,
  },
  {
    name: 'User Defined Call 2', abbreviation: 'x', editable: true, stage: 12,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 5,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 6,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 7,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 8,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 9,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 10,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 11,
  },
  {
    name: 'User Defined Call 3', abbreviation: 'y', editable: true, stage: 12,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 5,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 6,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 7,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 8,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 9,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 10,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 11,
  },
  {
    name: 'User Defined Call 4', abbreviation: 'z', editable: true, stage: 12,
  },
];

export default defaultCalls;

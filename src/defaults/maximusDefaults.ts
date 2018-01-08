import { IStage } from '../interfaces/Interfaces';

const maximus: IStage = {
    calls: [
        { callSymbol: 'b', callName: 'Bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'Single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', callNotation: '10', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', callNotation: '10ET', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 12,
};

export default maximus;

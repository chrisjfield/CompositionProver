import { IStage } from '../interfaces/Interfaces';

const minor: IStage = {
    calls: [
        { callSymbol: 'b', callName: 'Bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'Single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', callNotation: '16', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', callNotation: '1256', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 6,
};

export default minor;

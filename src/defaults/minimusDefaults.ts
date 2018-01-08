import { IStage } from '../interfaces/Interfaces';

const minimus: IStage = {
    calls: [
        { callSymbol: 'b', callName: 'Bob', coreCall: true },
        { callSymbol: 's', callName: 'Single', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 4,
};

export default minimus;

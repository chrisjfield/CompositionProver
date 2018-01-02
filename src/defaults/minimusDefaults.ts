import { IStage } from '../interfaces/Interfaces';

const minimus: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x14x14,12', coreMethod: true },
        { methodId: 2, methodSymbol: 'rc', methodName: 'Reverse Caterbury', methodPlaceNotation: '34.14x14,12', coreMethod: true },
    ],
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

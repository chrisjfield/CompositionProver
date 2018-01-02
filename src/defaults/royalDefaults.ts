import { IStage } from '../interfaces/Interfaces';

const royal: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x10x10x10x10x10,12', coreMethod: true },
        { methodId: 2, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'x30x14x1250x36x1470x58x16x70x18x90,12', coreMethod: true },
    ],
    calls: [
        { callSymbol: 'b', callName: 'Bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'Single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', callNotation: '18', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', callNotation: '1890', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 10,
};

export default royal;

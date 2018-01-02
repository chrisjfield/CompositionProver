import { IStage } from '../interfaces/Interfaces';

const cinques: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x1Tx1Tx1Tx1Tx1Tx1T,12', coreMethod: true },
        { methodId: 2, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'x3Tx14x125Tx36x147Tx58x169Tx70x18x9Tx10xET,12', coreMethod: true },
    ],
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

export default cinques;

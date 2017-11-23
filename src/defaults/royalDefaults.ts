import { IStage } from '../interfaces/Interfaces';

const royal: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'X.10.X.10.X.10.X.10.X.10.X.10.X.10.X.10.X.10.X.12', coreMethod: true },
        { methodId: 2, methodSymbol: 'ca', methodName: 'Cambridge', 
            methodPlaceNotation: 'X.30.X.14.X.1250.X.36.X.1470.X.58.X.16.X.70.X.18.X.90.X.18.X.70.X.16.X.58.X.1470.X.36.X.1250.X.14.X.30.X.12', coreMethod: true },
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

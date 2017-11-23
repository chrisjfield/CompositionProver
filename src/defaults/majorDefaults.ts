import { IStage } from '../interfaces/Interfaces';

const major: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'X.18.X.18.X.18.X.18.X.18.X.18.X.18.X.12', coreMethod: true },
        { methodId: 2, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'X.38.X.14.X.1258.X.36.X.14.X.58.X.16.X.78.X.16.X.58.X.14.X.36.X.1258.X.14.X.38.X.12', coreMethod: true },
    ],
    calls: [
        { callSymbol: 'b', callName: 'Bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'Single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', callNotation: '16', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', callNotation: '1678', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 8,
};

export default major;

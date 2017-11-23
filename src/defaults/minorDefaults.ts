import { IStage } from '../interfaces/Interfaces';

const minor: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'X.16.X.16.X.16.X.16.X.16.X.12', coreMethod: true },
        { methodId: 2, methodSymbol: 'cm', methodName: 'Cambridge Surprise Minor', methodPlaceNotation: 'X.36.X.14.X.12.X.36.X.14.X.56.X.14.X.36.X.12.X.14.X.36.X.12', coreMethod: true },
    ],
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

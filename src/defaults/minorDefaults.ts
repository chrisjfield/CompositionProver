import { IStage } from '../interfaces/Interfaces';

const minor: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'X.16.X.16.X.16.X.16.X.16.X.16', coreMethod: true },
        { methodId: 2, methodSymbol: 'og', methodName: 'Original', methodPlaceNotation: 'X.16.X.16.X.16.X.16.X.16.X.12', coreMethod: true },
        { methodId: 3, coreMethod: true },
        { methodId: 4, coreMethod: true },
    ],
    calls: [
        { callSymbol: 'b', callName: 'bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'extreme', callNotation: '16', coreCall: true },
        { callSymbol: 't', callName: 'extreme single', callNotation: '1256', coreCall: true },
        { callSymbol: '1', callName: 'other call 1', coreCall: true },
        { callSymbol: '2', callName: 'other call 2', coreCall: true },
    ],
    numberOfBells: 6,
};

export default minor;

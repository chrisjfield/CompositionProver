import { IStage } from '../interfaces/Interfaces';

const caters: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.129', coreMethod: true },
        { methodId: 2, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1', coreMethod: true },
        { methodId: 3, methodSymbol: 'sd', methodName: 'Stedman', methodPlaceNotation: '3.1.9.3.1.3.1.3.9.1.3.1', coreMethod: true },
    ],
    calls: [
        { callSymbol: 'b', callName: 'Bob', callNotation: '14', coreCall: true },
        { callSymbol: 's', callName: 'Single', callNotation: '1234', coreCall: true },
        { callSymbol: 'e', callName: 'Extreme', callNotation: '3.1', coreCall: true },
        { callSymbol: 't', callName: 'Extreme Single', callNotation: '3.13', coreCall: true },
        { callSymbol: '1', callName: 'Other call 1', coreCall: true },
        { callSymbol: '2', callName: 'Other call 2', coreCall: true },
    ],
    numberOfBells: 9,
};

export default caters;

import { IStage } from '../interfaces/Interfaces';

const cinques: IStage = {
    methods: [
        { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.1T.X.12', coreMethod: true },
        { methodId: 2, methodSymbol: 'ca', methodName: 'Cambridge', 
            methodPlaceNotation: 'X.3T.X.14.X.125T.X.36.X.147T.X.58.X.169T.X.70.X.18.X.9T.X.10.X.ET.X.10.X.9T.X.18.X.70.X.169T.X.58.X.147T.X.36.X.125T.X.14.X.3T.X.12', coreMethod: true },
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

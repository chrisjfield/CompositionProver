import { IMethod } from '../interfaces/Interfaces';

const methodDefaults: IMethod[] = [
    { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x14x14,12', coreMethod: true, stage: 4 },
    { methodId: 2, methodSymbol: 'rc', methodName: 'Reverse Caterbury', methodPlaceNotation: '34.14x14,12', coreMethod: true, stage: 4 },
    { methodId: 3, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '5.1.5.1.5,125', coreMethod: true, stage: 5 },
    { methodId: 4, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.5.1.5.1.5.1.5.1', coreMethod: true, stage: 5 },
    { methodId: 5, methodSymbol: 'sd', methodName: 'Stedman', methodPlaceNotation: '3.1.5.3.1.3.1.3.5.1.3.1', coreMethod: true, stage: 5 },
    { methodId: 6, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x16x16x16,12', coreMethod: true, stage: 6 },
    { methodId: 7, methodSymbol: 'cm', methodName: 'Cambridge Surprise Minor', methodPlaceNotation: 'x36x14x12x36x14x56,12', coreMethod: true, stage: 6 },
    { methodId: 8, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '7.1.7.1.7.1.7.1.7.1.7.1.7.127', coreMethod: true, stage: 7 },
    { methodId: 9, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.7.1.7.1.7.1.7.1.7.1.7.1', coreMethod: true, stage: 7 },
    { methodId: 10, methodSymbol: 'sd', methodName: 'Stedman', methodPlaceNotation: '3.1.7.3.1.3.1.3.7.1.3.1', coreMethod: true, stage: 7 },
    { methodId: 11, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x18x18x18x18,12', coreMethod: true, stage: 8 },
    { methodId: 12, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'x38x14x1258x36x14x58x16x78,12', coreMethod: true, stage: 8 },
    { methodId: 13, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.129', coreMethod: true, stage: 9 },
    { methodId: 14, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1', coreMethod: true, stage: 9 },
    { methodId: 15, methodSymbol: 'sd', methodName: 'Stedman', methodPlaceNotation: '3.1.9.3.1.3.1.3.9.1.3.1', coreMethod: true, stage: 9 },
    { methodId: 16, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x10x10x10x10x10,12', coreMethod: true, stage: 10 },
    { methodId: 17, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'x30x14x1250x36x1470x58x16x70x18x90,12', coreMethod: true, stage: 10 },
    { methodId: 18, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.12E', coreMethod: true, stage: 11 },
    { methodId: 19, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1', coreMethod: true, stage: 11 },
    { methodId: 20, methodSymbol: 'sd', methodName: 'Stedman', methodPlaceNotation: '3.1.E.3.1.3.1.3.E.1.3.1', coreMethod: true, stage: 11 },
    { methodId: 21, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x1Tx1Tx1Tx1Tx1Tx1T,12', coreMethod: true, stage: 12 },
    { methodId: 22, methodSymbol: 'ca', methodName: 'Cambridge', methodPlaceNotation: 'x3Tx14x125Tx36x147Tx58x169Tx70x18x9Tx10xET,12', coreMethod: true, stage: 12 },
];

export default methodDefaults;

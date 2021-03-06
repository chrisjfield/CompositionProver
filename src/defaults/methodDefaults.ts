import { IMethod } from '../interfaces/Interfaces';

const methodDefaults: IMethod[] = [
    { methodId: 1, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x14x14,12', coreMethod: true, stage: 4 },
    { methodId: 2, methodSymbol: 'rb', methodName: 'Reverse Bob', methodPlaceNotation: 'x14x34,14', coreMethod: true, stage: 4 },
    { methodId: 3, methodSymbol: 'db', methodName: 'Double Bob', methodPlaceNotation: 'x14x34,12', coreMethod: true, stage: 4 },
    { methodId: 4, methodSymbol: 'rc', methodName: 'Reverse Caterbury', methodPlaceNotation: '34.14x14,12', coreMethod: true, stage: 4 },
    { methodId: 5, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '5.1.5.1.5,125', coreMethod: true, stage: 5 },
    { methodId: 6, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.5.1.5.1.5.1.5.1', coreMethod: true, stage: 5 },
    { methodId: 7, methodSymbol: 'ss', methodName: 'Stedman Slow Six', methodPlaceNotation: '3.1.5.3.1.3', coreMethod: true, stage: 5 },
    { methodId: 8, methodSymbol: 'sq', methodName: 'Stedman Quick Six', methodPlaceNotation: '1.3.5.1.3.1', coreMethod: true, stage: 5 },
    { methodId: 9, methodSymbol: 'er', methodName: 'Erin', methodPlaceNotation: '5.3.1.3.1.3', coreMethod: true, stage: 5 },
    { methodId: 10, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x16x16x16,12', coreMethod: true, stage: 6 },
    { methodId: 11, methodSymbol: 'c', methodName: 'Cambridge Surprise Minor', methodPlaceNotation: 'x36x14x12x36x14x56,12', coreMethod: true, stage: 6 },
    { methodId: 12, methodSymbol: 'nw', methodName: 'Norwich Surprise Minor', methodPlaceNotation: 'x34x14x12x36x34x16,16', coreMethod: true, stage: 6 },
    { methodId: 13, methodSymbol: 'ld', methodName: 'London Surprise Minor', methodPlaceNotation: '36x36.14x12x36.14x14.36,12', coreMethod: true, stage: 6 },
    { methodId: 14, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '7.1.7.1.7.1.7.1.7.1.7.1.7.127', coreMethod: true, stage: 7 },
    { methodId: 15, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.7.1.7.1.7.1.7.1.7.1.7.1', coreMethod: true, stage: 7 },
    { methodId: 16, methodSymbol: 'ss', methodName: 'Stedman Slow Six', methodPlaceNotation: '3.1.7.3.1.3', coreMethod: true, stage: 7 },
    { methodId: 17, methodSymbol: 'sq', methodName: 'Stedman Quick Six', methodPlaceNotation: '1.3.7.1.3.1', coreMethod: true, stage: 7 },
    { methodId: 18, methodSymbol: 'er', methodName: 'Erin', methodPlaceNotation: '7.3.1.3.1.3', coreMethod: true, stage: 7 },
    { methodId: 19, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x18x18x18x18,12', coreMethod: true, stage: 8 },
    { methodId: 20, methodSymbol: 'c', methodName: 'Cambridge', methodPlaceNotation: 'x38x14x1258x36x14x58x16x78,12', coreMethod: true, stage: 8 },
    { methodId: 21, methodSymbol: 'y', methodName: 'Yorkshire', methodPlaceNotation: 'x38x14x58x16x12x38x14x78,12', coreMethod: true, stage: 8 },
    { methodId: 22, methodSymbol: 'n', methodName: 'Lincolnshire', methodPlaceNotation: 'x38x14x58x16x14x58x36x78,12', coreMethod: true, stage: 8 },
    { methodId: 23, methodSymbol: 's', methodName: 'Superlative', methodPlaceNotation: 'x36x14x58x36x14x58x36x78,12', coreMethod: true, stage: 8 },
    { methodId: 24, methodSymbol: 'b', methodName: 'Bristol', methodPlaceNotation: 'x58x14.58x58.36.14x14.58x14x18,18', coreMethod: true, stage: 8 },
    { methodId: 25, methodSymbol: 'l', methodName: 'London', methodPlaceNotation: '38x38.14x12x38.14x14.58.16x16.58,12', coreMethod: true, stage: 8 },
    { methodId: 26, methodSymbol: 'r', methodName: 'Rutland', methodPlaceNotation: 'x38x14x58x16x14x38x34x18,12', coreMethod: true, stage: 8 },
    { methodId: 27, methodSymbol: 'p', methodName: 'Pudsey', methodPlaceNotation: 'x58x16x12x38x14x58x16x78,12', coreMethod: true, stage: 8 },
    { methodId: 28, methodSymbol: 'dn', methodName: 'Double Norwich', methodPlaceNotation: 'x14x36x58x18,18', coreMethod: true, stage: 8 },
    { methodId: 29, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: '9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.129', coreMethod: true, stage: 9 },
    { methodId: 30, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1', coreMethod: true, stage: 9 },
    { methodId: 31, methodSymbol: 'ss', methodName: 'Stedman Slow Six', methodPlaceNotation: '3.1.9.3.1.3', coreMethod: true, stage: 9 },
    { methodId: 32, methodSymbol: 'sq', methodName: 'Stedman Quick Six', methodPlaceNotation: '1.3.9.1.3.1', coreMethod: true, stage: 9 },
    { methodId: 33, methodSymbol: 'er', methodName: 'Erin', methodPlaceNotation: '9.3.1.3.1.3', coreMethod: true, stage: 9 },
    { methodId: 34, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x10x10x10x10x10,12', coreMethod: true, stage: 10 },
    { methodId: 35, methodSymbol: 'c', methodName: 'Cambridge', methodPlaceNotation: 'x30x14x1250x36x1470x58x16x70x18x90,12', coreMethod: true, stage: 10 },
    { methodId: 36, methodSymbol: 'y', methodName: 'Yorkshire', methodPlaceNotation: 'x30x14x50x16x1270x38x14x50x16x90,12', coreMethod: true, stage: 10 },
    { methodId: 37, methodSymbol: 'b', methodName: 'Bristol', methodPlaceNotation: 'x50x14.50x50.36.14x70.58.16x16.70x16x10,10', coreMethod: true, stage: 10 },
    { methodId: 38, methodSymbol: 'l', methodName: 'London No.3', methodPlaceNotation: '30x30.14x12x30.14x14.50.16x16.70.14.58.14.90,12', coreMethod: true, stage: 10 },
    { methodId: 39, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.12E', coreMethod: true, stage: 11 },
    { methodId: 40, methodSymbol: 'gs', methodName: 'Grandsire', methodPlaceNotation: '3.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1.E.1', coreMethod: true, stage: 11 },
    { methodId: 41, methodSymbol: 'ss', methodName: 'Stedman Slow Six', methodPlaceNotation: '3.1.E.3.1.3', coreMethod: true, stage: 11 },
    { methodId: 42, methodSymbol: 'sq', methodName: 'Stedman Quick Six', methodPlaceNotation: '1.3.E.1.3.1', coreMethod: true, stage: 11 },
    { methodId: 43, methodSymbol: 'er', methodName: 'Erin', methodPlaceNotation: 'E.3.1.3.1.3', coreMethod: true, stage: 11 },
    { methodId: 44, methodSymbol: 'pb', methodName: 'Plain Bob', methodPlaceNotation: 'x1Tx1Tx1Tx1Tx1Tx1T,12', coreMethod: true, stage: 12 },
    { methodId: 45, methodSymbol: 'c', methodName: 'Cambridge', methodPlaceNotation: 'x3Tx14x125Tx36x147Tx58x169Tx70x18x9Tx10xET,12', coreMethod: true, stage: 12 },
    { methodId: 46, methodSymbol: 'y', methodName: 'Yorkshire', methodPlaceNotation: 'x3Tx14x5Tx16x127Tx38x149Tx50x16x7Tx18xET,12', coreMethod: true, stage: 12 },
    { methodId: 47, methodSymbol: 'b', methodName: 'Bristol', methodPlaceNotation: 'x5Tx14.5Tx5T.36.14x7T.58.16x9T.70.18x18.9Tx18x1T,1T', coreMethod: true, stage: 12 },
    { methodId: 48, methodSymbol: 'z', methodName: 'Zanussi', methodPlaceNotation: 'x5Tx14.5Tx12.3T.14x12.5T.16x16.7T.58x18.9Tx18x9T,1T', coreMethod: true, stage: 12 },
    { methodId: 49, methodSymbol: 'o', methodName: 'Orion', methodPlaceNotation: '36x7T.18x9T.50.36.14x1470.5T.16x9T.30.18x14.3T.50.14x1T,1T', coreMethod: true, stage: 12 },
];

export default methodDefaults;

export const getStageCharacter = (stage: number) => {
    let char: string = ''
    switch (stage) {
        case 10:
            char = '0';
            break;
        case 11:
            char = 'E';
            break;
        case 12:
            char = 'T';
            break;
        default:
            char = stage.toString();
    }

    return char;
}

export const getStageNumber = (stage: string) => {
    let position: number;
    switch (stage) {
        case '0':
            position = 10;
            break;
        case 'E':
            position = 11;
            break;
        case 'T':
            position = 12;
            break;
        default:
            position = Number(stage);
    }

    return position;
}

export const getStageCallingPositionRegex = (stage: number) => {
    let callingPositionRegex: string = '';

    switch (stage) {
        case 4:
            callingPositionRegex = 'I|O|4';
            break;
        case 5:
            callingPositionRegex = 'I|O|4|H';
            break;
        case 6:
            callingPositionRegex = 'I|O|4|W|H';
            break;
        case 7:
            callingPositionRegex = 'I|O|4|M|W|H';
            break;
        case 8:
            callingPositionRegex = 'I|O|4|5|M|W|H';
            break;
        case 9:
            callingPositionRegex = 'I|O|4|5|6|M|W|H';
            break;
        case 10:
            callingPositionRegex = 'I|O|4|5|6|7|M|W|H';
            break;
        case 11:
            callingPositionRegex = 'I|O|4|5|6|7|8|M|W|H';
            break;
        case 12:
            callingPositionRegex = 'I|O|4|5|6|7|8|9|M|W|H';
            break;
    }

    return callingPositionRegex;
}

export const getTenorIndexFromCallPosition = (position: string, stage: number) => {
    let index: number = 0;
    position = position.toUpperCase();

    if (position === 'I') {
        index = 1;
    } else if (position === 'O') {
        index = 2;
    } else if (position === '4') {
        index = 3;
    } else if (position === 'H' && stage >= 5) {
        index = stage - 1;
    } else if (position === 'W' && stage >= 6) {
        index = stage - 2;
    } else if (position === 'M' && stage >= 7) {
        index = stage - 3;
    } else if (position === '5' && stage >= 8) {
        index = 4;
    } else if (position === '6' && stage >= 9) {
        index = 5;
    } else if (position === '7' && stage >= 10) {
        index = 6;
    } else if (position === '8' && stage >= 11) {
        index = 7;
    } else if (position === '9' && stage >= 12) {
        index = 8;
    }

    if (index === 0) {
        throw new Error(`calling position ${position} is not valid on ${stage.toString()} bells.`);
    }

    return index;
}

export const getStageQueens = (stage: number) => {
    let queens: string = '';

    switch (stage) {
        case 4:
            queens = '1324';
            break;
        case 5:
            queens = '135246';
            break;
        case 6:
            queens = '135246';
            break;
        case 7:
            queens = '13572468';
            break;
        case 8:
            queens = '13572468';
            break;
        case 9:
            queens = '1357924680';
            break;
        case 10:
            queens = '1357924680';
            break;
        case 11:
            queens = '13579E24680T';
            break;
        case 12:
            queens = '13579E24680T';
            break;
    }

    return queens;
}

export const getStageTittums = (stage: number) => {
    let tittums: string = '';

    switch (stage) {
        case 4:
            tittums = '1324';
            break;
        case 5:
            tittums = '142536';
            break;
        case 6:
            tittums = '142536';
            break;
        case 7:
            tittums = '15263748';
            break;
        case 8:
            tittums = '15263748';
            break;
        case 9:
            tittums = '1627384950';
            break;
        case 10:
            tittums = '1627384950';
            break;
        case 11:
            tittums = '172839405E6T';
            break;
        case 12:
            tittums = '172839405E6T';
            break;
    }

    return tittums;
}

export const getStageRollupsForward = (stage: number) => {
    let rollups: string = '';

    switch (stage) {
        case 4:
            rollups = '1234';
            break;
        case 5:
            rollups = '3456';
            break;
        case 6:
            rollups = '3456';
            break;
        case 7:
            rollups = '5678';
            break;
        case 8:
            rollups = '5678';
            break;
        case 9:
            rollups = '7890';
            break;
        case 10:
            rollups = '7890';
            break;
        case 11:
            rollups = '90ET';
            break;
        case 12:
            rollups = '90ET';
            break;
    }

    return rollups;
}

export const getStageRollupsBackward = (stage: number) => {
    let rollups: string = '';

    switch (stage) {
        case 4:
            rollups = '4321';
            break;
        case 5:
            rollups = '6543';
            break;
        case 6:
            rollups = '6543';
            break;
        case 7:
            rollups = '8765';
            break;
        case 8:
            rollups = '8765';
            break;
        case 9:
            rollups = '0987';
            break;
        case 10:
            rollups = '0987';
            break;
        case 11:
            rollups = 'TE09';
            break;
        case 12:
            rollups = 'TE09';
            break;
    }

    return rollups;
}

export const getInitialChange = (stage: number) => {
    const initialChange: string[] = [];

    for (let i = 1; i <= stage; i += 1) {
        initialChange.push(getStageCharacter(i));
    }
    const initialChangeString: string = initialChange.join('');

    return initialChangeString;
}
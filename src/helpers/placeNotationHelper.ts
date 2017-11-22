export function getPositionFromNotationCharacter(character: string) {
    let position: number;
    switch (character) {
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
        position = Number(character);
    }

    return position;
}

export function getNotationCharacterFromPosition(position: number) {
    let character: string;
    switch (position) {
    case 10:
        character = '0';
        break;
    case 11:
        character = 'E';
        break;
    case 12:
        character = 'T';
        break;
    default: 
        character = String(position);
    }

    return character;
}

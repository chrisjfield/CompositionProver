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

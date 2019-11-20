import { INewMethod, IMethod } from "../interfaces/interfaces";
import { getStageNotationRegex } from "../defaults/stages";

export async function getMethodListForStage(stage: number, callBack: (methods: INewMethod[]) => void) {
    const methodsUrl: string = `${window.location.origin.toString()}/methodsList.xml`;
    fetch(methodsUrl).then(response => response.text())
        .then(methodsText => processMethodSets(stage, methodsText))
        .then(methods => callBack(methods))
};

const processMethodSets = (stage: number, methodsText: string) => {
    const methodArray: INewMethod[] = [];

    const xmlParser = new DOMParser();
    const document = xmlParser.parseFromString(methodsText, "text/xml");
    const methodSets = document.getElementsByTagName("methodSet");

    for (let i = 0; i < methodSets.length; i++) {
        const methodSetStage = Number(methodSets[i].getElementsByTagName("stage")[0].childNodes[0].nodeValue);
        if (methodSetStage === stage) {
            const methods = methodSets[i].getElementsByTagName("method");
            processMethods(stage, methods, methodArray);
        }
    }

    return methodArray;
}

const processMethods = (stage: number, methods: HTMLCollectionOf<Element>, methodArray: INewMethod[]) => {
    for (let i = 0; i < methods.length; i++) {
        const methodName = String(methods[i].getElementsByTagName("title")[0].childNodes[0].nodeValue);
        const methodPlaceNotation = String(methods[i].getElementsByTagName("notation")[0].childNodes[0].nodeValue);
        const methodAbbreviation = String(methodName.replace(/[^a-z0-9+]+/gi, '')).substring(0, 3) + stage.toString();

        const method: INewMethod = {
            name: methodName,
            abbreviation: methodAbbreviation,
            stage: stage,
            placeNotation: methodPlaceNotation.toUpperCase(),
            defaultBob: 'b',
            defaultSingle: 's'
        }

        methodArray.push(method);
    }

    return methodArray;
}

export const isValidMethodNotation = (stage: number, notation: string) => {
    let valid = true;

    const stageRegex = getStageNotationRegex(stage);
    const validNotationRegex = RegExp(`^[\\-]?${stageRegex}{1}([\\.\\-\\,]{1}${stageRegex})*$`);
    valid = validNotationRegex.test(notation);

    // regex allows multiple commas so check this is not the case
    valid = notation.split(",").length > 2 ? false : valid;

    return valid;
}

export const getMethodAbbreviationRegex = (methods: IMethod[], numberOfBells: Number) => {
    let regex = ''

    if (methods.length > 0) {
        methods.forEach(method => regex += `${method.abbreviation}|`);
        regex = regex.slice(0, -1);
    }

    return regex;
}

export const sortMethods = (methodA: IMethod, methodB: IMethod) => {
    if (methodA.stage < methodB.stage) {
        return 1;
    } else if (methodA.stage === methodB.stage && methodA.name > methodB.name) {
        return 1;
    } else {
        return -1;
    }
}
import { INewMethod } from "../interfaces/interfaces";

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
        const methodAbbreviation = methodName.substring(0, 3) + stage.toString();

        const method: INewMethod = {
            name: methodName,
            abbreviation: methodAbbreviation,
            stage: stage,
            placeNotation: methodPlaceNotation,
            defaultBob: 'b',
            defaultSingle: 's'
        }

        methodArray.push(method);
    }

    return methodArray;
}
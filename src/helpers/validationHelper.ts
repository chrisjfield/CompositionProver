import { IMethod } from '../interfaces/Interfaces';

class validationHelper {
    static validateCall = (call: string) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^[0-9ET.]+$');
        const test: Boolean = regexp.test(call);

        if (!call) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'notation may only contain 0-9, E, T & .';
        }

        return validationMessage;
    }

    static validateMethodName = (methodName: string) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^[a-zA-Z\\s]+$');
        const test: Boolean = regexp.test(methodName);

        if (!methodName) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'method names may only contain letters';
        }

        return validationMessage;
    }

    static validatePlaceNotation = (placeNotation: string) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^([0-9ETx.]+(\\,[0-9ETx.]*)?)$');
        const test: Boolean = regexp.test(placeNotation);

        if (!placeNotation) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'place notation not valid - see help for guidance';
        }

        return validationMessage;
    }

    static validateMethodSymbol = (methodSymbol: string, methods: IMethod[]) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^[a-z0-9]+$');
        const test: Boolean = regexp.test(methodSymbol);
        const symbolCount: number = methods.filter((method: IMethod) => method.methodSymbol === methodSymbol).length;

        if (!methodSymbol) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'letters and numbers only';
        } else if (symbolCount > 1) {
            validationMessage = 'code must be unique';
        }

        return validationMessage;
    }

    static validateComposition = (composition: string) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^([0-9a-z]+(\\.[0-9a-z]+)*)$');
        const test: Boolean = regexp.test(composition);

        if (!composition) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'composition not valid - see help for guidance';
        }

        return validationMessage;
    }
}
  
export default validationHelper;

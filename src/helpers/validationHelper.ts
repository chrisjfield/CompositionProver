class validationHelper {
    static validateCall = (call: string) => {
        let validationMessage: string = null;
        const regexp: RegExp = new RegExp('^[0-9,E,T]+$');
        const test: Boolean = regexp.test(call);

        if (!call) {
            validationMessage = null;
        } else if (!test) {
            validationMessage = 'notation may only contain 0-9, E & T';
        }

        return validationMessage;
    }
}
  
export default validationHelper;

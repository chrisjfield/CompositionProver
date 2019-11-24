import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    stageDropdown: {
        display: 'flex',
        width: '175px',
        margin: '20px auto',
    },
    callField: {
        width: '175px',
        margin: '0 10px',
    },
    callText: {
        lineHeight: '60px',
        width: '175px',
        verticalAlign: 'middle',
        padding: '0 10px',
    },
    callContainer: {
        padding: '4px 20px',
    },
    methodDialogPaper: {
        height: '600px',
    },
    methodDialogSearch: {
        margin: '0 15px 15px 15px',
    },
    methodDialogTitle: {
        textAlign: 'center',
    },
    loading: {
        margin: '50px auto',
    },
    buttonLeft: {
        margin: '10px 10px 10px 0',
        width: '180px',
    },
    buttonRight: {
        margin: '10px 0 10px 0',
        width: '180px',
    },
    methodCallDropdown: {
        width: '200px',
    },
    methodList: {
        margin: '0 15px'
    },
    methodDelete: {
        marginTop: '18px',
    },
    helpContainer: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    compositionSettingField: {
        width: '150px',
    },
    compositionCheckbox: {
        marginTop: '24px',
    },
    compositionContainer: {
        marginTop: '10px',
        marginBottom: '20px',
    },
    compositionCompositionField: {
        maxWidth: '600px',
    },
    compositionMethodField: {
        maxWidth: '250px',
    },
    loadingText: {
        marginTop: '25px',
        marginLeft: '-50px',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    },
    resultsContainer: {
        padding: '20px',
    },
    resultsTruthTrue: {
        color: 'green',
    },
    resultsTruthFalse: {
        color: 'red',
    },
    resultsField: {
        marginTop: '15px',
        marginBottom: '10px',
    },
    resultsText: {
        marginTop: '15px',
    },
    sectionRow: {
        letterSpacing: '4px',
    },
    resultDivider: {
        maxWidth: '170px',
        margin: 'auto',
    },
    resultSettingField: {
        width: '200px',
        marginTop: '15px',
    },
    gridLead: {
        paddingTop: '40px',
    },
    gridInitialLead: {
        paddingTop: '15px',
    },
    gridHighlightTreble: {
        color: 'red',
    },
    gridHighlightBell: {
        color: 'blue',
        fontWeight: 'bold',
    },
    HelperText: {
        fontWeight: 'lighter',
    },
    falseRow: {
        backgroundColor: '#ff000057',
    },
});

export default useStyles;
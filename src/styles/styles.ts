import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    stageDropdown: {
        display: 'flex!important',
        width: '175px!important',
        margin: '20px auto!important',
    },
    callField: {
        width: '175px!important',
        margin: '0 10px!important',
    },
    callText: {
        lineHeight: '60px!important',
        width: '175px!important',
        verticalAlign: 'middle!important',
        padding: '0 10px!important',
    },
    callContainer: {
        padding: '4px 20px!important',
    },
    methodDialogPaper: {
        height: '600px!important',
    },
    methodDialogSearch: {
        margin: '0 15px 15px 15px!important',
    },
    methodDialogTitle: {
        textAlign: 'center!important' as 'center',
    },
    loading: {
        margin: '50px auto!important',
    },
    buttonLeft: {
        margin: '10px 10px 10px 0!important',
        width: '180px!important',
    },
    buttonRight: {
        margin: '10px 0 10px 0!important',
        width: '180px!important',
    },
    methodCallDropdown: {
        width: '200px!important',
    },
    methodList: {
        margin: '0 15px!important'
    },
    methodDelete: {
        marginTop: '18px!important',
    },
    helpContainer: {
        marginTop: '20px!important',
        marginBottom: '20px!important',
    },
    compositionSettingField: {
        width: '150px!important',
    },
    compositionCheckbox: {
        marginTop: '24px!important',
    },
    compositionContainer: {
        marginTop: '10px!important',
        marginBottom: '20px!important',
    },
    compositionCompositionField: {
        maxWidth: '600px!important',
    },
    compositionMethodField: {
        maxWidth: '250px!important',
    },
    loadingText: {
        marginTop: '25px!important',
        marginLeft: '-50px!important',
    },
    errorText: {
        color: 'red!important',
        fontWeight: 'bold!important' as 'bold',
    },
    resultsContainer: {
        padding: '20px!important',
    },
    resultsTruthTrue: {
        color: 'green!important',
    },
    resultsTruthFalse: {
        color: 'red!important',
    },
    resultsField: {
        marginTop: '15px!important',
        marginBottom: '10px!important',
    },
    resultsText: {
        marginTop: '15px!important',
    },
    sectionRow: {
        letterSpacing: '4px!important',
    },
    resultDivider: {
        maxWidth: '170px!important',
        margin: 'auto!important',
    },
    resultSettingField: {
        width: '200px!important',
        marginTop: '15px!important',
    },
    gridLead: {
        paddingTop: '40px!important',
    },
    gridInitialLead: {
        paddingTop: '15px!important',
    },
    gridHighlightTreble: {
        color: 'red!important',
    },
    gridHighlightBell: {
        color: 'blue!important',
        fontWeight: 'bold!important' as 'bold',
    },
    HelperText: {
        fontWeight: 'lighter!important' as 'lighter',
    },
    falseRow: {
        backgroundColor: '#ff000057!important',
    },
    importContainer: {
        bottom: 0,
        marginLeft: 'calc(50% - 126px)',
        paddingBottom: '10px'
    }
});

export default useStyles;
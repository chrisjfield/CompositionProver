import { makeStyles } from '@material-ui/styles';

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
});

export default useStyles;
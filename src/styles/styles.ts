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
        padding: '4px 20px'
    },
});

export default useStyles;
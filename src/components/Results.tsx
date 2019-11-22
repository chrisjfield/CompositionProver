import React from 'react';
import { connect } from 'react-redux';

import { IResultsState, IResult, IResultsSettingsType, ILeadResults } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { getCompositionMethods } from '../redux/selectors/methodSelectors';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { Grid, Container, CircularProgress, Typography, TextField, MenuItem } from '@material-ui/core';
import { calculateResult } from '../helpers/resultHelper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { emptyResult, defaultResultSettings } from '../defaults/results';
import Divider from '@material-ui/core/Divider';

const Results = (props: IResultsState) => {
    const styles = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [result, setResult] = React.useState(emptyResult);
    const [settings, setSettings] = React.useState(defaultResultSettings);
    const [workingBell, setworkingBell] = React.useState('None');

    const handleWorkingBellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setworkingBell(event.target.value);
    };

    const handleSettingChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [name]: event.target.checked });
    };

    const onComplete = (result: IResult) => {
        setLoading(false);
        setResult(result);
    }

    const runComposition = () => {
        if (loading && !error) {
            // do this on a set timeout to allow the main thread long enough to render the loading page.
            setTimeout(function () { tryCalculation(); }, 100);
        }
    }

    const tryCalculation = () => {
        try {
            calculateResult(props.composition, props.methods, props.calls, (result: IResult) => onComplete(result));
        }
        catch (error) {
            if (error.message) {
                setError(error.message);
            }
            else {
                setError('An Unknown Error Occurred :(');
            }
        }
    }

    const getReadOnlyField = (label: string, value: string) => {
        const id: string = `results-${label.replace(/[\n\r\s]+/g, '')}`
        return (
            <Grid item xs={12} md={4}>
                <TextField
                    id={id}
                    label={label}
                    variant="outlined"
                    value={value}
                    className={styles.resultsField}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>
        )
    }

    const getHeader = (label: string) => {
        return (
            <Grid item xs={12}>
                <Typography variant='subtitle1' className={styles.resultsText}>
                    <u>{label}</u>
                </Typography>
            </Grid>
        )
    }

    const getCheckbox = (label: string, property: IResultsSettingsType) => {
        return (
            <Grid item xs={12}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings[property]}
                            onChange={handleSettingChange(property.toString())}
                            value={property.toString()}
                            color='primary'
                        />
                    }
                    label={label}
                />
            </Grid>
        )
    }

    const getLeadEndSection = () => {
        return (
            <Grid item xs={12} md={4}>
                <Typography variant='subtitle2' align='center'>
                    <u>Lead Ends</u>
                </Typography>
                <Typography align='center' className={styles.sectionRow}>
                    <b>{result.initialChange}</b>
                </Typography>
                <Divider variant='middle' className={styles.resultDivider} />
                {getLeadEnds()}
            </Grid>
        )
    }

    const getLeadEnds = () => {
        let previousMethod: string = '';

        return result.leads.map((lead: ILeadResults, index: number) => {
            const methodChanged: boolean = previousMethod !== lead.method;
            previousMethod = lead.method;

            return (
                <Grid container>
                    <Grid item xs={4}>
                        <Typography align='right'>
                            <b>{methodChanged && (lead.method + '  ')}</b>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {getChanges([lead.rows[lead.rows.length - 1]])}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='left'>
                            <b>{lead.call !== 'p' && '  ' + lead.call}</b>
                        </Typography>
                    </Grid>
                </Grid>
            );
        });
    }

    const getSection = (label: string, rowArray: string[]) => {
        return (
            <Grid item xs={12} md={4}>
                <Typography variant='subtitle2' align='center'>
                    <u>{label}</u>
                </Typography>
                <Typography align='center' className={styles.sectionRow}>
                    <b>{result.initialChange}</b>
                </Typography>
                <Divider variant='middle' className={styles.resultDivider} />
                {getChanges(rowArray)}
            </Grid>
        )
    }

    const getChanges = (rowArray: string[]) => {
        return rowArray.map((row: string, index: number) => (
            <Typography align='center' className={styles.sectionRow}>
                {row}
            </Typography>
        ));
    }

    const getDropdownOptions = (array: Array<string | number>) => {
        return array.map((item) => (
            <MenuItem key={item.toString()} value={item}>
                {item.toString()}
            </MenuItem>
        ));
    }

    const getWorkingBellDropdown = () => {
        return (
            <Grid item xs={12}>
                <TextField
                    select
                    id='results-HighlightWorkingBell'
                    className={styles.resultSettingField}
                    label='Highlight Working Bell'
                    value={workingBell}
                    onChange={handleWorkingBellChange}
                    variant='outlined'
                >
                    {getDropdownOptions(['None', 4, 5, 6, 7, 8, 9, 10, 11, 12])}
                </TextField>
            </Grid>
        )
    }

    const getResultsContent = () => {
        if (error) {
            return (
                <Grid container className={styles.callContainer}>
                    <Grid item className={styles.loading}>
                        <Typography className={styles.errorText}>
                            {error}
                        </Typography>
                    </Grid>
                </Grid>
            )
        } else if (loading) {
            return (
                <Grid container className={styles.callContainer}>
                    <Grid item className={styles.loading}>
                        <CircularProgress />
                        <Typography className={styles.loadingText}>
                            Calculating Results...
                    </Typography>
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container className={styles.callContainer}>
                    {getHeader('Statistics')}
                    <Grid item xs={12} md={4}>
                        <TextField
                            id='results-truth'
                            label='Truth'
                            variant="outlined"
                            value={result.truth.true ? 'True' : 'False'}
                            helperText={result.truth.comesRound ? null : 'Does not come round'}
                            className={styles.resultsField}
                            InputProps={{
                                readOnly: true,
                                className: result.truth.true ? styles.resultsTruthTrue : styles.resultsTruthFalse,
                            }}
                            FormHelperTextProps={{
                                className: styles.resultsTruthFalse,
                            }}
                        />
                    </Grid>
                    {getReadOnlyField('Number of Changes', result.numberOfChanges.toString())}
                    {getReadOnlyField('Changes of Method', result.changesOfMethod.toString())}
                    {getHeader('Music')}
                    {getReadOnlyField('Queens', result.musicalChanges.queens.toString())}
                    {getReadOnlyField('Tittums', result.musicalChanges.tittums.toString())}
                    {getReadOnlyField('Rollups (Front)', result.musicalChanges.rollupsFront.toString())}
                    {getReadOnlyField('Rollups (Back)', result.musicalChanges.rollupsBack.toString())}
                    {getReadOnlyField('Little Bells (Front)', result.musicalChanges.littleBellsFront.toString())}
                    {getReadOnlyField('Little Bells (Back)', result.musicalChanges.littleBellsBack.toString())}
                    {getHeader('Section Ends')}
                    {getCheckbox('Show Section Ends', 'showSections')}
                    {settings.showSections && getSection('Part Ends', result.partEnds)}
                    {settings.showSections && getSection('Course Ends', result.courseEnds)}
                    {settings.showSections && getLeadEndSection()}
                    {getHeader('Grid')}
                    {getCheckbox('Show Grid', 'showGrid')}
                    {getCheckbox('Highlight Treble Path', 'showTreble')}
                    {getWorkingBellDropdown()}
                </Grid>
            )
        }
    }

    // run the actual composition, pass in set state handlers to feedback results or errors
    runComposition();

    return (
        <Container>
            {getResultsContent()}
        </Container>
    )
}

const mapStateToProps = (state: IAppState) => {
    const composition = getCurrentComposition(state);
    const methods = getCompositionMethods(state);;
    const calls = getCalls(state);
    return { composition, methods, calls };
};

export default connect(mapStateToProps)(Results);

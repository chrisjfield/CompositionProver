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
import { getStageCharacter } from '../helpers/stageHelper';

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
            if ((error as Error).message) {
                setError((error as Error).message);
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
            <Typography align='center' className={styles.sectionRow} key={`change-${index.toString()}`}>
                {row}
            </Typography>
        ));
    }

    const getDropdownOptions = () => {
        const dropDownArray: string[] = [];
        for (let i = 1; i <= props.composition.numberOfBells; i += 1) {
            dropDownArray.push(i === 1 ? 'None' : i.toString());
        }

        return dropDownArray.map((item) => (
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
                    {getDropdownOptions()}
                </TextField>
            </Grid>
        )
    }

    const getTruthField = () => {
        return (
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
        )
    }

    const getGrid = () => {
        let previousMethod: string = '';

        return result.leads.map((lead: ILeadResults, index: number) => {
            const methodChanged: boolean = previousMethod !== lead.method;
            previousMethod = lead.method;

            return getGridLead(lead, methodChanged, index);
        })
    }

    const getGridLead = (lead: ILeadResults, methodChanged: boolean, index: number) => {
        const sytle: string = index === 0 ? styles.gridInitialLead : styles.gridLead;

        return (
            <Grid item xs={12} md={6} lg={4} key={`lead-${index.toString()}`} className={sytle}>
                {index === 0 && getInitialChange()}
                {lead.rows.map((row: string, index: number) => {
                    const method = (index === 0 && methodChanged) ? lead.method : '';
                    const call = (index === lead.rows.length - 1) ? lead.call : '';

                    return getGridRow(row, call, method, index);
                })}
            </Grid>
        )
    }

    const getInitialChange = () => {
        return ([
            <Typography align='center' className={styles.sectionRow} key={'initialChange'}>
                <b>{result.initialChange}</b>
            </Typography>,
            <Divider variant='middle' className={styles.resultDivider} key={'initialChangeDivider'} />
        ])
    }

    const getGridRow = (row: string, call: string, method: string, index: number) => {
        const sytle: string = row === result.truth.firstFalseRow ? styles.falseRow : '';

        return (
            <Grid container key={`row-${index.toString()}`}>
                <Grid item xs={3}>
                    <Typography align='right'>
                        <b>{method + '  '}</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} className={sytle}>
                    {getGridBells(row, index)}
                </Grid>
                <Grid item xs={3}>
                    <Typography align='left'>
                        <b>{call !== 'p' && '  ' + call}</b>
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    const getGridBells = (row: string, index: number) => {
        return (
            <Typography align='center' className={styles.sectionRow} key={`change-${index.toString()}`}>
                {
                    Array.from(row).map((char: string, index: number) => {
                        const trebleClassName: string = (settings.showTreble && char === '1') ? styles.gridHighlightTreble : '';
                        const workingBellName: string = (char === getStageCharacter(Number(workingBell))) ? styles.gridHighlightBell : '';
                        const style: string = `${trebleClassName} ${workingBellName}`;

                        return (
                            <span className={style} key={`bell-${index.toString()}`}>
                                {char}
                            </span>
                        )
                    })
                }
            </Typography>
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
                    {getTruthField()}
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
                    <Typography className={styles.HelperText}>
                        Please allow a bit of time when clicking "Show Section Ends" for the section ends to render.
                    </Typography>
                    {getCheckbox('Show Section Ends', 'showSections')}
                    {settings.showSections && getSection('Part Ends', result.partEnds)}
                    {settings.showSections && getSection('Course Ends', result.courseEnds)}
                    {settings.showSections && getLeadEndSection()}
                    {getHeader('Grid')}
                    <Typography className={styles.HelperText}>
                        Please allow a bit of time when changing an option below to allow for the grid to render.
                    </Typography>
                    {getCheckbox('Show Grid', 'showGrid')}
                    {getCheckbox('Highlight Treble Path', 'showTreble')}
                    {getWorkingBellDropdown()}
                    {settings.showGrid && getGrid()}
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

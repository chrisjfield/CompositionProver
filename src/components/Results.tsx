import React from 'react';
import { connect } from 'react-redux';

import { IResultsState, IResult } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { getCompositionMethods } from '../redux/selectors/methodSelectors';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { Grid, Container, CircularProgress, Typography, TextField } from '@material-ui/core';
import { calculateResult, emptyResult } from '../helpers/resultHelper';

const Results = (props: IResultsState) => {
    const styles = useStyles();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [result, setResult] = React.useState(emptyResult);

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

    const getTextField = (label: string) => {
        return (
            <Grid item xs={12}>
                <Typography variant='subtitle1' className={styles.resultsText}>
                    <u>{label}</u>
                </Typography>
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
                    {getTextField('Statistics')}
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
                                className: result.truth.true ? styles.resultsTruthTrue : styles.resultsTruthFalse
                            }}
                        />
                    </Grid>
                    {getReadOnlyField('Number of Changes', result.numberOfChanges.toString())}
                    {getReadOnlyField('Changes of Method', result.changesOfMethod.toString())}
                    {getTextField('Music')}
                    {getReadOnlyField('Queens', result.musicalChanges.queens.toString())}
                    {getReadOnlyField('Tittums', result.musicalChanges.tittums.toString())}
                    {getReadOnlyField('Rollups (Front)', result.musicalChanges.rollupsFront.toString())}
                    {getReadOnlyField('Rollups (Back)', result.musicalChanges.rollupsBack.toString())}
                    {getReadOnlyField('Little Bells (Front)', result.musicalChanges.littleBellsFront.toString())}
                    {getReadOnlyField('Little Bells (Back)', result.musicalChanges.littleBellsBack.toString())}
                    {getTextField('Section Ends')}
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

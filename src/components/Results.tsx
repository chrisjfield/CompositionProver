import React from 'react';
import { connect } from 'react-redux';

import { IResultsState, IResult } from '../interfaces/interfaces';
import useStyles from '../styles/styles';
import { IAppState } from '../redux/reducers/rootReducer';
import { getCalls } from '../redux/selectors/callSelectors';
import { getCompositionMethods } from '../redux/selectors/methodSelectors';
import { getCurrentComposition } from '../redux/selectors/compositionSelectors';
import { Grid, Container, CircularProgress, Typography } from '@material-ui/core';
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

    const getResultsContent = () => {
        if (error) {
            return (
                <Container className={styles.compositionContainer}>
                    <Grid container>
                        <Grid item className={styles.loading}>
                            <Typography className={styles.errorText}>
                                {error}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            )
        } else if (loading) {
            return (
                <Container className={styles.compositionContainer}>
                    <Grid container>
                        <Grid item className={styles.loading}>
                            <CircularProgress />
                            <Typography className={styles.loadingText}>
                                Calculating Results...
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            )
        } else {
            return (
                <Container className={styles.compositionContainer}>
                    <Grid container>
                        <Grid item xs={6}>
                            {result.truth.true.toString()}
                            {result.numberOfChanges.toString()}
                        </Grid>
                    </Grid>
                </Container>
            )
        }
    }

    // run the actual composition, pass in set state handlers to feedback results or errors
    runComposition();

    return getResultsContent();
}

const mapStateToProps = (state: IAppState) => {
    const composition = getCurrentComposition(state);
    const methods = getCompositionMethods(state);;
    const calls = getCalls(state);
    return { composition, methods, calls };
};

export default connect(mapStateToProps)(Results);

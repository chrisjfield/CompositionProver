import { useContext, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CompositionContext from '../../context/compositionContext';
import { emptyResult } from '../../defaults/results';
import MethodContext from '../../context/methodContext';
import CallContext from '../../context/callContext';
import { Result } from '../../types/results';
import AlertContext from '../../context/alertContext';
import ResultsLoading from './resultsLoading';
import ResultsStats from './resultsStats';
import ResultsMusic from './resultsMusic';
import ResultsSections from './resultsSections';
import ResultsGrid from './resultsGrid';
import SettingsContext from '../../context/settingsContext';
import ResultGenerator from '../../helpers/resultGenerator';

const ResultsTab = () => {
  const { settings: { selectedComposition } } = useContext(SettingsContext);
  const { compositions } = useContext(CompositionContext);
  const { methods } = useContext(MethodContext);
  const { calls } = useContext(CallContext);
  const { showError, showSuccess } = useContext(AlertContext);
  const composition = compositions[selectedComposition];

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(emptyResult);

  const onComplete = (res: Result) => {
    setResult(res);
    setLoading(false);
  };

  const runCalculation = () => {
    try {
      const resultGenerator = new ResultGenerator(methods, calls, composition);
      resultGenerator.calculateResult((res: Result) => onComplete(res));
      showSuccess('Computation Complete');
    } catch (e) {
      const errorMessage = (e as Error).message || 'An Unknown Error Occurred :(';
      showError(errorMessage);
    }
  };

  useEffect(() => {
    // do this on a set timeout to allow the main thread long enough to render the loading page.
    setTimeout(() => runCalculation(), 100);
  }, []);

  return loading
    ? <ResultsLoading />
    : (
      <Grid>
        <ResultsStats result={result} />
        <ResultsMusic result={result} />
        <ResultsSections result={result} />
        <ResultsGrid result={result} />
      </Grid>
    );
};

export default ResultsTab;

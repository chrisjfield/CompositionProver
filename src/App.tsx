import { useContext } from 'react';
import CallContext from './context/callContext';

const App = () => {
  const { calls, dispatch } = useContext(CallContext);

  return (
    <div className="App">
      <p>
        {JSON.stringify(calls[0])}
      </p>
      <button type="button" onClick={() => { dispatch({ type: 'update', payload: { ...calls[0], name: calls[0].name += '1' } }); }}>
        Hello
      </button>
    </div>
  );
};

export default App;

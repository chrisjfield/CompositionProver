import { useContext } from 'react';
import MethodContext from '../context/methodContext';
import SettingsContext from '../context/settingsContext';
import StageSelector from '../components/stageSelector/stageSelector';
import CallContext from '../context/callContext';

const MethodsPage = () => {
  const { methods } = useContext(MethodContext);
  const { settings: { methodStage } } = useContext(SettingsContext);
  const { calls } = useContext(CallContext);

  const getCallName = (value: string) => calls
    .find((call) => call.stage === methodStage && call.abbreviation === value)!.name;

  const deleteMethod = (id: number) => {
    console.log('Deleting method', id);
  };

  return (
    <>
      <StageSelector />
      <div className="flex flex-col items-center w-full mx-auto max-w-7xl">
        <div id="table-heading" className="hidden w-full text-gray-600 bg-gray-100 border border-gray-200 rounded-t-lg lg:flex methods-table--header">
          <div className="methods-table--column__name">Method Name</div>
          <div className="methods-table--column__abbr">Abbreviation</div>
          <div className="methods-table--column__notation">Place Notation</div>
          <div className="methods-table--column__bob">Default Bob</div>
          <div className="methods-table--column__single">Default Single</div>
        </div>
        <div className="w-full bg-white border border-gray-200 divide-y rounded-b-lg">
          {methods.filter((method) => method.stage === methodStage).map((method) => (
            <div key={method.id} className="flex w-full border-gray-200 even:bg-gray-50 last:rounded-b-lg">
              <div className="flex py-2 pl-2 pr-6 font-bold methods-table--column__name">
                <p>{ method.name }</p>
                <button type="button" onClick={() => deleteMethod(method.id)}>Del</button>
              </div>
              <p className="py-2 pl-2 pr-6 methods-table--column__abbr">{method.abbreviation}</p>
              <p className="py-2 pl-2 pr-6 methods-table--column__notation">{method.placeNotation}</p>
              <p className="py-2 pl-2 pr-6 methods-table--column__bob">{getCallName(method.defaultBob)}</p>
              <p className="py-2 pl-2 pr-6 methods-table--column__single">{getCallName(method.defaultSingle)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MethodsPage;

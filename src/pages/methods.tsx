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
      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="hidden w-full text-gray-600 bg-gray-100 border border-gray-200 rounded-t-lg sm:flex methods-table--header">
          <div className="methods-table--column__name">Method Name (Abbr.)</div>
          <div className="methods-table--column__notation">Place Notation</div>
          <div className="methods-table--column__bob">Default Bob</div>
          <div className="methods-table--column__single">Default Single</div>
          <div className="methods-table--column__actions" />
        </div>
        <div className="w-full bg-white border border-gray-200 divide-y rounded-b-lg">
          {methods.filter((method) => method.stage === methodStage).map((method) => (
            <div key={method.id} className="flex flex-wrap items-center w-full border-gray-200 sm:flex-nowrap even:bg-gray-50 last:rounded-b-lg">
              <div className="block py-2 pl-2 sm:pr-6 sm:flex methods-table--column__name">
                <p className="text-lg sm:text-base">
                  <span className="font-bold">{method.name}</span>
                  <span className="ml-1">
                    (
                    {method.abbreviation}
                    )
                  </span>
                </p>
              </div>
              <p className="w-full py-2 pl-2 pr-6 methods-table--column__notation">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Place Notation:</span>
                {method.placeNotation}
              </p>
              <p className="py-2 pl-2 pr-6 methods-table--column__bob">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Default Bob:</span>
                {getCallName(method.defaultBob)}
              </p>
              <p className="py-2 pl-2 pr-6 methods-table--column__single">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Default Single:</span>
                {getCallName(method.defaultSingle)}
              </p>
              <div className="flex flex-row flex-wrap justify-end w-full sm:justify-start methods-table--column__actions">
                <button type="button" className="w-16 py-1 my-1 mr-2 text-white bg-blue-700 rounded sm:py-0 hover:bg-blue-800" onClick={() => deleteMethod(method.id)}>Edit</button>
                <button type="button" className="w-16 py-1 my-1 mr-2 text-white bg-red-700 rounded sm:py-0 hover:bg-red-800" onClick={() => deleteMethod(method.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MethodsPage;

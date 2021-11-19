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

  const gridColumns = ['Method Name', 'Abbreviation', 'Place Notation', 'Default Bob', 'Default Single'];

  return (
    <>
      <StageSelector />
      <div className="max-w-7xl w-full mx-auto rounded-lg overflow-hidden border">
        <table className="w-full">
          <thead>
            <tr className="overflow-hidden divide-x bg-gray-100 border-b-2">
              {gridColumns.map((column) => <th key={column} className="text-left pl-2 pr-6 font-normal border-gray-700 text-gray-600">{column}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y">
            {methods
              .filter((method) => method.stage === methodStage)
              .map((method) => (
                <tr key={`method_${method.id}`} className="last:rounded-b-lg overflow-hidden even:bg-gray-50">
                  <td>{method.name}</td>
                  <td>{method.abbreviation}</td>
                  <td>{method.placeNotation}</td>
                  <td>{getCallName(method.defaultBob)}</td>
                  <td>{getCallName(method.defaultSingle)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MethodsPage;

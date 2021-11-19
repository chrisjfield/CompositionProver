import { useContext } from 'react';
import MethodContext from '../context/methodContext';
import SettingsContext from '../context/settingsContext';
import StageSelector from '../components/stageSelector/stageSelector';
import CallContext from '../context/callContext';
import MethodCard from '../components/Cards/MethodCard';

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
      <div className="mx-auto rounded-lg overflow-hidden border md:mx-6 lg:mx-12 xl:mx-20">
        <table className="w-full">
          <thead>
            <tr className="overflow-hidden bg-gray-100 border-b-2">
              {gridColumns.map((column) => <th key={column} className="text-left pl-2 pr-6 py-2 font-normal border-gray-700 text-gray-600">{column}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y">
            {methods
              .filter((method) => method.stage === methodStage)
              .map((method) => (
                <tr key={method.id} className="even:bg-gray-50 py-6">
                  <td className="p-2 font-semibold text-gray-800">{method.name}</td>
                  <td className="text-gray-700">{method.abbreviation}</td>
                  <td className="text-gray-600">{method.placeNotation}</td>
                  <td className="">{getCallName(method.defaultBob)}</td>
                  <td className="">{getCallName(method.defaultSingle)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row flex-wrap">
        {methods
          .filter((method) => method.stage === methodStage)
          .map((method) => (
            <div key={method.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
              <MethodCard method={method} />
            </div>
          ))}
      </div>
    </>
  );
};

export default MethodsPage;

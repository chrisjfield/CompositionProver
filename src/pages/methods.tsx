import { useContext } from 'react';
import MethodContext from '../context/methodContext';
import SettingsContext from '../context/settingsContext';
import StageSelector from '../components/stageSelector/stageSelector';
// import CallContext from '../context/callContext';
import MethodCard from '../components/Cards/MethodCard';
import MethodsEmptyState from '../components/methods/MethodsEmptyState';

const MethodsPage = () => {
  const { methods } = useContext(MethodContext);
  const { settings: { methodStage } } = useContext(SettingsContext);
  // const { calls } = useContext(CallContext);

  // const getCallName = (value: string) => calls
  //   .find((call) => call.stage === methodStage && call.abbreviation === value)!.name;

  // const gridColumns = ['Method Name', 'Abbreviation', 'Place Notation', 'Default Bob', 'Default Single'];

  return (
    <>
      <StageSelector />
      {/* <div className="mx-auto overflow-hidden border rounded-lg md:mx-6 lg:mx-12 xl:mx-20">
        <table className="w-full">
          <thead>
            <tr className="overflow-hidden bg-gray-100 border-b-2">
              {gridColumns.map((column) => (<th key={column} className="py-2 pl-2 pr-6 font-normal text-left text-gray-600 border-gray-700">{column}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {methods
              .filter((method) => method.stage === methodStage)
              .map((method) => (
                <tr key={method.id} className="py-6 even:bg-gray-50">
                  <td className="p-2 font-semibold text-gray-800">{method.name}</td>
                  <td className="text-gray-700">{method.abbreviation}</td>
                  <td className="text-gray-600">{method.placeNotation}</td>
                  <td className="">{getCallName(method.defaultBob)}</td>
                  <td className="">{getCallName(method.defaultSingle)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}
      <div className="flex flex-row flex-wrap">
        {methods
          .filter((method) => method.stage === methodStage)
          .map((method) => (
            <div key={method.id} className="w-full px-4 mb-8 sm:w-1/2 xl:w-1/3">
              <MethodCard method={method} />
            </div>
          ))}
      </div>
      {/* !methods.length */ true && <MethodsEmptyState />}
    </>
  );
};

export default MethodsPage;

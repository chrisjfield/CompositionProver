import { useContext, useState } from 'react';
import MethodContext from '../context/methodContext';
import SettingsContext from '../context/settingsContext';
import StageSelector from '../components/stageSelector/stageSelector';
import CallContext from '../context/callContext';
import ModalsEditMethod from '../components/Modals/ModalsEditMethod';
import { deleteMethod } from '../components/wrappers/methodContextWrapper';
import ModalsWrapper from '../components/Modals/ModalsWrapper';
import { Method } from '../types/methods';

const MethodsPage = () => {
  const [activeEditMethodId, setActiveEditMethodId] = useState(null as number | null);
  const [activeDeleteMethod, setActiveDeleteMethod] = useState(null as Method | null);
  const { methods, dispatch } = useContext(MethodContext);
  const { settings: { methodStage } } = useContext(SettingsContext);
  const { calls } = useContext(CallContext);

  const getCallName = (value: string) => calls
    .find((call) => call.stage === methodStage && call.abbreviation === value)!.name;

  const removeMethod = (method: Method) => {
    setActiveDeleteMethod(method);
  };

  const confirmDeleteMethod = () => {
    if (!activeDeleteMethod) return;
    dispatch(deleteMethod(activeDeleteMethod.id));
    setActiveDeleteMethod(null);
  };

  const cancelDeleteMethod = () => {
    setActiveDeleteMethod(null);
  };

  const openEditModal = (methodId: number) => {
    setActiveEditMethodId(methodId);
  };

  const closeEditModal = () => {
    setActiveEditMethodId(null);
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
              <div className="block p-2 sm:flex methods-table--column__name">
                <p className="text-lg sm:text-base">
                  <span className="font-bold">{method.name}</span>
                  <span className="ml-1">
                    (
                    {method.abbreviation}
                    )
                  </span>
                </p>
              </div>
              <p className="w-full p-2 sm:text-sm methods-table--column__notation">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Place Notation:</span>
                {method.placeNotation}
              </p>
              <p className="p-2 methods-table--column__bob">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Default Bob:</span>
                {getCallName(method.defaultBob)}
              </p>
              <p className="p-2 methods-table--column__single">
                <span className="mr-2 text-sm text-gray-600 sm:hidden">Default Single:</span>
                {getCallName(method.defaultSingle)}
              </p>
              <div className="flex flex-row flex-wrap justify-end w-full sm:justify-start methods-table--column__actions">
                <button type="button" className="w-16 py-1 my-1 mr-2 text-white bg-blue-700 rounded sm:py-0 hover:bg-blue-800" onClick={() => openEditModal(method.id)}>Edit</button>
                <button type="button" className="w-16 py-1 my-1 mr-2 text-white bg-red-700 rounded sm:py-0 hover:bg-red-800" onClick={() => removeMethod(method)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalsEditMethod onClose={closeEditModal} activeEditMethodId={activeEditMethodId} />

      {/* Delete method modal */}
      <ModalsWrapper isOpen={!!activeDeleteMethod} onClose={cancelDeleteMethod}>
        <h3 className="mb-3 text-3xl">Confirm delete</h3>
        <p className="max-w-lg">
          Are you sure you want to delete
          {' '}
          <b>{activeDeleteMethod?.name}</b>
          ?
        </p>
        <button type="button" className="w-full py-1 mt-3 text-lg text-red-700 bg-transparent border-2 border-red-700 rounded-full hover:bg-red-700 hover:text-white" onClick={confirmDeleteMethod}>Confirm</button>
        <button type="button" className="w-full py-1 mt-3 text-lg text-white bg-blue-700 border-2 border-blue-700 rounded-full hover:border-blue-800 hover:bg-blue-800" onClick={cancelDeleteMethod}>Cancel</button>
      </ModalsWrapper>
    </>
  );
};

export default MethodsPage;

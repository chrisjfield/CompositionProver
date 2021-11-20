import { useContext } from 'react';
import CallContext from '../../context/callContext';
import SettingsContext from '../../context/settingsContext';
import { Method } from '../../types/methods';
import BinIcon from '../icons/BinIcon';
import PencilIcon from '../icons/PencilIcon';

const MethodCard = ({ method }: { method: Method }) => {
  const { calls } = useContext(CallContext);
  const { settings: { methodStage } } = useContext(SettingsContext);

  const getCallName = (value: string) => calls
    .find((call) => call.stage === methodStage && call.abbreviation === value)!.name;
  return (
    <div className="rounded-lg border border-gray-600 shadow">
      <p className="text-xl font-bold text-gray-800">{method.name}</p>
      <p className="text-xl font-bold text-gray-800">{method.abbreviation}</p>
      <p className="text-xl font-bold text-gray-800">{method.placeNotation}</p>
      <p className="text-xl font-bold text-gray-800">{getCallName(method.defaultBob)}</p>
      <p className="text-xl font-bold text-gray-800">{getCallName(method.defaultSingle)}</p>
      <div className="flex border-t divide-x">
        <button type="button" className="w-1/2 flex justify-center items-center py-2 rounded-bl-lg text-gray-600 hover:bg-blue-700 hover:text-white method-card--button">
          <span className="method-card--button-label" aria-hidden="true">Edit</span>
          <span className="sr-only">{`Edit Method: ${method.name}`}</span>
          <PencilIcon className="w-7 h-7 fill-current" />
        </button>
        <button type="button" className="w-1/2 flex justify-center items-center py-2 rounded-br-lg text-gray-600 hover:bg-red-700 hover:text-white method-card--button">
          <span className="method-card--button-label" aria-hidden="true">Delete</span>
          <span className="sr-only">{`Delete Method: ${method.name}`}</span>
          <BinIcon className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default MethodCard;

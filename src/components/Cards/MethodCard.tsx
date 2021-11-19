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
        <button type="button" className="block w-1/2 text-center py-2 rounded-bl-lg text-gray-600 hover:bg-blue-700 hover:text-white">
          <span className="sr-only">Edit Method</span>
          <PencilIcon className="w-8 h-8 mx-auto fill-current" />
        </button>
        <button type="button" className="block w-1/2 text-center py-2 rounded-br-lg text-gray-600 hover:bg-red-700 hover:text-white">
          <span className="sr-only">Delete Method</span>
          <BinIcon className="w-9 h-9 mx-auto fill-current" />
        </button>
      </div>
    </div>
  );
};

export default MethodCard;
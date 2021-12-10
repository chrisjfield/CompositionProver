import { ModalsWrapperProps } from '../../types/props';
import CloseIcon from '../icons/CloseIcon';

const ModalsWrapper = ({
  children, isOpen, onClose, hideCloseIcon,
}: ModalsWrapperProps) => {
  const dismissModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center w-full h-full">
      <div
        role={hideCloseIcon ? undefined : 'button'}
        aria-label="close"
        tabIndex={hideCloseIcon ? undefined : 0}
        onClick={hideCloseIcon ? undefined : dismissModal}
        onKeyUp={hideCloseIcon ? undefined : () => {}}
        className="absolute inset-0 z-30 w-full h-full bg-black opacity-50 cursor-default"
      />
      <div className="relative z-30 p-12 mx-4 bg-white rounded-xl">
        {!hideCloseIcon
          && (
          <button type="button" onClick={dismissModal} className="absolute top-0 right-0 m-6">
            <span className="sr-only">Close</span>
            <CloseIcon className="w-8 h-8 text-gray-500" />
          </button>
          )}
        {children}
      </div>
    </div>
  );
};

export default ModalsWrapper;

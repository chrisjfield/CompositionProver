import { ModalsWrapperProps } from '../../types/props';
import CloseIcon from '../icons/CloseIcon';

const ModalsWrapper = ({ children, closeModal, hideCloseIcon }: ModalsWrapperProps) => {
  const dismissModal = () => {
    closeModal();
  };

  return (
    <div className="fixed w-full h-full inset-0 flex justify-center items-center z-30">
      <div
        role={hideCloseIcon ? undefined : 'button'}
        aria-label="close"
        tabIndex={hideCloseIcon ? undefined : 0}
        onClick={hideCloseIcon ? undefined : dismissModal}
        onKeyUp={hideCloseIcon ? undefined : () => {}}
        className="absolute inset-0 w-full h-full bg-black opacity-50 cursor-default z-30"
      />
      <div className="modal-dimensions relative rounded-xl bg-white p-12 z-30">
        {!hideCloseIcon
          && (
          <button type="button" onClick={dismissModal} className="absolute top-0 right-0 m-6">
            <span className="sr-only">Close</span>
            <CloseIcon className="text-gray-500 w-8 h-8" />
          </button>
          )}
        {children}
      </div>
    </div>
  );
};

export default ModalsWrapper;

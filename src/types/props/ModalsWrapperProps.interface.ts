import { ReactNode } from 'react';

export default interface ModalsWrapperProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hideCloseIcon?: boolean;
}

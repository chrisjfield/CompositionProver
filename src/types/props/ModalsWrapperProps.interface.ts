import { ReactNode } from 'react';

export default interface ModalsWrapperProps {
  children: ReactNode;
  closeModal: Function;
  hideCloseIcon?: boolean;
}

import { useContext } from 'react';
import MethodContext from '../../context/methodContext';
import { ModalsEditMethodProps } from '../../types/props';
import ModalsWrapper from './ModalsWrapper';

const ModalsEditMethod = ({ onClose, activeEditMethodId }: ModalsEditMethodProps) => {
  const { methods } = useContext(MethodContext);
  const activeMethod = methods.find((method) => method.id === activeEditMethodId);

  if (!activeMethod) return null;

  return (
    <ModalsWrapper isOpen onClose={onClose} hideCloseIcon={false}>
      <p>{activeMethod.name}</p>
    </ModalsWrapper>
  );
};

export default ModalsEditMethod;

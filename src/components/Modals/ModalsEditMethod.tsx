import {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import MethodContext from '../../context/methodContext';
import SettingsContext from '../../context/settingsContext';
import { isValidMethodNotation } from '../../helpers/methodHelper';
import { Method } from '../../types/methods';
import EditMethodFormErrors from '../../types/methods/EditMethodFormErrors.interface';
import { ModalsEditMethodProps } from '../../types/props';
import ModalsWrapper from './ModalsWrapper';

const ModalsEditMethod = ({ onClose, activeEditMethodId }: ModalsEditMethodProps) => {
  const { methods } = useContext(MethodContext);
  const { settings: { methodStage } } = useContext(SettingsContext);
  const activeMethod = methods.find((method) => method.id === activeEditMethodId);
  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [placeNotation, setPlaceNotation] = useState('');
  const [defaultBob, setDefaultBob] = useState('');
  const [defaultSingle, setDefaultSingle] = useState('');
  const [formErrors, setFormErrors] = useState({} as EditMethodFormErrors);

  const setFieldValues = (method?: Method) => {
    setName(method?.name ?? '');
    setAbbreviation(method?.abbreviation ?? '');
    setPlaceNotation(method?.placeNotation ?? '');
    setDefaultBob(method?.defaultBob ?? '');
    setDefaultSingle(method?.defaultSingle ?? '');
  };

  const clearFormErrors = () => {
    setFormErrors({});
  };

  // Set form values when the active method changes
  useEffect(() => {
    clearFormErrors();
    setFieldValues(activeMethod);
  }, [activeMethod]);

  const updateNameField = (event: FormEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, name: undefined });
    setName((event.target as HTMLInputElement).value);
  };

  const updateAbbreviationField = (event: FormEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, abbr: undefined });
    setAbbreviation((event.target as HTMLInputElement).value);
  };

  const updatePlaceNotationField = (event: FormEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, notation: undefined });
    setPlaceNotation((event.target as HTMLInputElement).value);
  };

  const updateBobField = (event: FormEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, bob: undefined });
    setDefaultBob((event.target as HTMLInputElement).value);
  };

  const updateSingleField = (event: FormEvent<HTMLInputElement>) => {
    setFormErrors({ ...formErrors, single: undefined });
    setDefaultSingle((event.target as HTMLInputElement).value);
  };

  const isUniqueAbbreviation = (abbr: string) => methods.filter((method) => (
    method.abbreviation === abbr && method.id !== activeMethod?.id
  )).length > 0;

  // TODO: extract this to some Utils file potentially
  const validateForm = () => {
    clearFormErrors();

    const errors: EditMethodFormErrors = {};

    // Validate that there are no empty fields
    if (!name) {
      errors.name = 'You must provide a name for the method';
    }
    if (!abbreviation) {
      errors.abbr = 'You must provide an abbreviation';
    } else if (isUniqueAbbreviation(abbreviation)) {
      errors.abbr = 'You must use a unique abbreviation';
    }
    if (!placeNotation) {
      errors.notation = 'You must provide a place notation';
    } else if (!isValidMethodNotation(methodStage, placeNotation)) {
      errors.notation = 'Place notation is invalid';
    }
    if (!defaultBob) {
      errors.bob = 'You must select a default bob';
    }
    if (!defaultSingle) {
      errors.single = 'You must select a default single';
    }
    setFormErrors(errors);
  };

  const submit = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    validateForm();
    if (Object.keys(formErrors).length) return;
    // Submit the form
    console.log('form success');
  };

  if (!activeMethod) return null;

  return (
    <ModalsWrapper isOpen onClose={onClose} hideCloseIcon>
      <h3 className="mb-2 text-3xl">Edit method</h3>
      <form className="form">
        <label htmlFor="method-name">
          Name
          <input id="method-name" type="text" value={name} onChange={updateNameField} className={formErrors.name && 'field-has-error'} />
          {
            formErrors.name && <p className="form-error">{formErrors.name}</p>
          }
        </label>
        <label htmlFor="method-abbreviation">
          Abbreviation
          <input id="method-abbreviation" type="text" value={abbreviation} onChange={updateAbbreviationField} className={formErrors.abbr && 'field-has-error'} />
          {
            formErrors.abbr && <p className="form-error">{formErrors.abbr}</p>
          }
        </label>
        <label htmlFor="method-notation">
          Place Notation
          <input id="method-notation" type="text" value={placeNotation} onChange={updatePlaceNotationField} className={formErrors.notation && 'field-has-error'} />
          {
            formErrors.notation && <p className="form-error">{formErrors.notation}</p>
          }
        </label>
        <label htmlFor="method-bob">
          Default Bob
          <input id="method-bob" type="text" value={defaultBob} onChange={updateBobField} className={formErrors.bob && 'field-has-error'} />
          {
            formErrors.bob && <p className="form-error">{formErrors.bob}</p>
          }
        </label>
        <label htmlFor="method-single">
          Default Single
          <input id="method-single" type="text" value={defaultSingle} onChange={updateSingleField} className={formErrors.single && 'field-has-error'} />
          {
            formErrors.single && <p className="form-error">{formErrors.single}</p>
          }
        </label>
        <button type="submit" className="px-6 py-2 text-white bg-blue-700 rounded" onClick={submit}>Submit</button>
        <button type="button" className="px-6 py-2 text-red-700 bg-transparent rounded ring-2 ring-red-700 hover:bg-red-700 hover:text-white" onClick={onClose}>Cancel</button>
      </form>
    </ModalsWrapper>
  );
};

export default ModalsEditMethod;

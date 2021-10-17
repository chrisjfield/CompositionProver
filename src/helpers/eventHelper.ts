const getTypedValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  const { value, type, checked } = target;

  switch (type) {
    case 'number':
      return Number(value);
    case 'checkbox':
      return checked;
    default:
      return value;
  }
};

export default getTypedValue;

const getTypedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value, type, checked } = event.target;
  let typedValue: Number | Boolean | String;

  switch (type) {
    case 'number':
      typedValue = Number(value);
      break;
    case 'checkbox':
      typedValue = checked;
      break;
    default:
      typedValue = value;
  }

  return typedValue;
};

export default getTypedValue;

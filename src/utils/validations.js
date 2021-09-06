export const validate = (valueValidationObj, cb) => {
  const valid = Object.values(valueValidationObj).every((value) => (
    value.value !== '' && value.validation === true
  ));
  
  cb(!valid);
};

export const handleFormInput = (name, value, regex, valueValidationObj, cb) => {
  const formTemp = {...valueValidationObj};

  formTemp[name] = { value, validation: regex.test(value) ? true : false };

  cb(formTemp);
};

export const handleArrayInput = (name, value, min, max, valueValidationObj, cb) => {
  const formTemp = {...valueValidationObj};
  const len = value.length;
  
  formTemp[name] = { value, validation: len >= min && len <= max  ? true : false };

  cb(formTemp);
};

export const handleFileInput = (name, file, maxSize, valueValidationObj, cb) => {
  if (!file)
    return cb({ ...valueValidationObj, [name]: { value: '', validation: true } });

  const formTemp = {...valueValidationObj};
  let valid = false;

  if (file && file.size <= maxSize) valid = true;
  if (file && file.size > maxSize) valid = `file size should not be more than ${maxSize / 1000000}mb`;

  formTemp[name] = { value: file, validation: valid };
  cb(formTemp);
};

export const handleTimeInput = (name, type, value, valueValidationObj, cb) => {
  if (!value) return;
  const formTemp = {...valueValidationObj};
  const regEx = /^\d{2}:\d{2}-\d{2}:\d{2}$/gi;
  const oldValue = formTemp[name].value;
  const newValue = (type === 'from')
    ? value + '-' + oldValue.replace(/^\d{2}:\d{2}-/gi, '')
    : oldValue.replace(/-\d{2}:\d{2}$/gi, '-') + value;
  
  formTemp[name] = { value: newValue, validation: regEx.test(newValue) ? true : false };

  cb(formTemp);
};

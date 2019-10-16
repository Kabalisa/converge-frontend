import Joi from 'joi-browser';

const AddLevel = (flattenedData, levelType) => {
  const Data = flattenedData.map((item) => {
    const { name } = item;
    return { name };
  });
  if (!levelType) {
    return 'Leveltype can not be empty';
  }

  const schema = {
    name: Joi.string().trim().min(2).required()
      .label(levelType),
  };
  const receivedErrors = Data.map((item) => {
    const { error: joiError } = Joi.validate(item, schema);
    if (joiError) {
      return joiError.details[0].message;
    }
    return '';
  });
  const receivedError = receivedErrors.find(item => item !== '');

  if (receivedError) {
    return receivedError;
  }
  return '';
};

export default AddLevel;

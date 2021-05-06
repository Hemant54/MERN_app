import Joi from 'joi';
import validations from './schema';
export default (req, res, next) => {
  req.validate = (data, placeholder = '', replacement = null) => {
    let schema = validations[placeholder];
    if (schema) {
      if (replacement) {
        schema = {...schema, ...replacement};
      }
      return Joi.validate(data, Joi.object(schema), {
        abortEarly: false,
        language: {
          key: '{{key}} ',
        },
      });
    } else {
      return {
        error: {
          details: [
            {
              context: {key: 'schema'},
              message: 'No validation schema provided.',
            },
          ],
        },
      };
    }
  };
  next();
};

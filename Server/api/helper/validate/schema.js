import Joi from "joi";

let options = Joi.object().keys({
  desc: Joi.string().required(),
});

let options2 = Joi.object().keys({
  desc: Joi.string().required(),
  _id: Joi.string(),
  question: Joi.string(),
});

let schema = {
  createUser: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  },
  createQuestion: {
    desc: Joi.string().required(),
    options: Joi.array().items(options).min(3).required(),
  },
  updateQuestion: {
    _id: Joi.string().required(),
    desc: Joi.string().required(),
    user: Joi.string(),
    options: Joi.array().items(options2).min(3).required(),
  },
};

export default schema;

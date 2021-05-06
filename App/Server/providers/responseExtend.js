import transform from './lang';

export default (req, res, next) => {
  const {lang = 'en'} = req.header;
  /**
   * validation response
   *
   * @param      {String}             message
   * @param      {Array}     			[data=[]]
   * @param      {Number}  			[status=400]
   */
  res.withValidation = (data = [], status = 422) => {
    const updated = data.map((single) => {
      return {
        [single.context.key]: single.message,
      };
    });
    const object = {
      status,
      message: transform(data[0].message, lang),
      data: updated,
    };
    res.status(status).send(object);
  };
  /**
   * All other responses
   *
   * @param      {String}             message
   * @param      {(Object|Array)}     [data=null]
   * @param      {Number}	  			[status=200]
   */
  res.withResponse = (message, data = null, status = 200) => {
    const object = {
      status,
      message: transform(message, lang),
      data,
    };
    res.status(status).send(object);
  };
  next();
};

import db from '../api/models';
const {universities} = db;

const getHost = (url) => {
  let hostname;

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/').shift();
  }

  hostname = hostname = hostname
    .split(':')
    .shift()
    .split('?')
    .shift()
    .split('.learnotter.com')
    .shift();

  return hostname;
};

export default async (req, res, next) => {
  try {
    const {headers} = req;
    /*
      TODO: header.university is temporarily,
            we will get this details from
            referrar URL once we deploy
            the project. 
     */
    if (headers.university) {
      const domain = getHost(headers.university);
      console.log('domain', domain);
      if (domain) {
        const university = await universities.findOne({
          where: {domain},
        });
        if (university) {
          req.university = university.dataValues;
          return await next();
        }
      }
    }
    return await res.withResponse('INVALID_UNIVERSITY', null, 400);
  } catch (error) {
    return await res.withResponse(error.message, null, 500);
  }
};

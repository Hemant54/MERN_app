import bcrypt from 'bcrypt';
const saltRound = 10;

const generatePassword = (password = '') => {
  try {
    return bcrypt.hashSync(password, saltRound);
  } catch (error) {
    return null;
  }
};

const matched = (hashed, string) => {
  try {
    return bcrypt.compareSync(string, hashed);
  } catch (error) {
    return false;
  }
};

export {generatePassword, matched};

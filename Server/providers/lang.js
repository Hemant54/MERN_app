const languages = {
  en: {
    LOGGED_IN: "Account logged in",
    INVALID_EMAIL: "Invalid email please check",
    INVALID_LOGIN:
      "Invalid email or password provided. Please provide valid credentials.",
    UNAUTHORIZED: "Unauthorized action. Please login first.",
    TOKEN_EXPIRED: "Login token has been expired. Please login again.",
    NOT_ALLOWED: "You are not allowed to perform this operation.",
    INVALID_TOKEN: "You have provided invalid login token.",
    USER_CREATED: "New user has been created.",
    INVALID_ENTRY: "Unable to create Item",
    QUESTION_CREATED: "New question has been created.",
    UPDATED_QUESTION:"Question has been updated",
    INVALID_DATA:"Invalid Data",
    QUESTION_DATA:"Question has been fetched successfully"
  },
};

/**
 * Language transformation
 *
 * @param      {String}  message
 * @param      {string}  [lang='en']
 * @return     {String}
 */
const transform = (message, lang = "en") => {
  if (languages[lang]) {
    if (languages[lang][message]) {
      return languages[lang][message];
    }
    if (languages.en[message]) {
      return languages.en[message];
    }
  } else if (languages.en[message]) {
    return languages.en[message];
  }
  return message;
};

export default transform;

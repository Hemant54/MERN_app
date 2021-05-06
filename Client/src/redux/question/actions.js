const actions = {
  GET_QUESTIONS: "GET_QUESTIONS",
  GET_QUESTIONS_SUCCESS: "GET_QUESTIONS_SUCCESS",
  GET_QUESTIONS_FAILURE: "GET_QUESTIONS_FAILURE",

  Add_QUESTION: "Add_QUESTION",
  Add_QUESTION_SUCCESS: "Add_QUESTION_SUCCESS",
  Add_QUESTION_FAILURE: "Add_QUESTION_FAILURE",

  GET_QUESTION_BYID: "GET_QUESTION_BYID",
  GET_QUESTION_BYID_SUCCESS: "GET_QUESTION_BYID_SUCCESS",
  GET_QUESTION_BYID_FAILURE: "GET_QUESTION_BYID_FAILURE",

  UPDATE_QUESTION: "UPDATE_QUESTION",
  UPDATE_QUESTION_SUCCESS: "UPDATE_QUESTION_SUCCESS",
  UPDATE_QUESTION_FAILURE: "UPDATE_QUESTION_FAILURE",

  /**
   * Gets the Question.
   *
   * @param      {Object}  [payload={}]
   */
  getQuestions: (payload = {}) => ({
    type: actions.GET_QUESTIONS,
    payload,
  }),

  /**
   * Gets the questions success.
   *
   * @param      {Array}  payload
   */
  getQuestionsSuccess: (payload = []) => ({
    type: actions.GET_QUESTIONS_SUCCESS,
    payload,
  }),

  /**
   * Gets the questions failure.
   *
   * @param      {string}  [payload=""]
   */
  getQuestionsFailure: (payload = "") => ({
    type: actions.GET_QUESTIONS_FAILURE,
    payload,
  }),

  /**
   * Adds the question.
   *
   * @param      {object}  [payload={}]
   */
  addQuestion: (payload = {}) => ({
    type: actions.Add_QUESTION,
    payload,
  }),

  /**
   * Adds the question Success.
   *
   * @param      {object}  payload
   */
  addQuestionSuccess: (payload = {}) => ({
    type: actions.Add_QUESTION_SUCCESS,
    payload,
  }),

  /**
   * Adds the question.
   *
   * @param      {string}  [payload=""]
   */
  addQuestionFailure: (payload = "") => ({
    type: actions.Add_QUESTION_FAILURE,
    payload,
  }),

  /**
   * Gets the question by id.
   *
   * @param      {integer}  [payload=0]
   */
  getQuestionById: (payload = 0) => ({
    type: actions.GET_QUESTION_BYID,
    payload,
  }),

  /**
   * Gets the question Success.
   *
   * @param      {object}  payload
   */
  getQuestionByIdSuccess: (payload = {}) => ({
    type: actions.GET_QUESTION_BYID_SUCCESS,
    payload,
  }),

  /**
   * Adds the question failure.
   *
   * @param      {string}  [payload=""]
   */
  getQuestionByIdFailure: (payload = "") => ({
    type: actions.GET_QUESTION_BYID_FAILURE,
    payload,
  }),

  /**
   * Updates the question.
   *
   * @param      {integer}  [payload=0]
   */
  updateQuestionById: (payload = {}) => ({
    type: actions.UPDATE_QUESTION,
    payload,
  }),

  /**
   * Updates the question Success.
   *
   * @param      {object}  payload
   */
  updateQuestionByIdSuccess: (payload = {}) => ({
    type: actions.UPDATE_QUESTION_SUCCESS,
    payload,
  }),

  /**
   * Updates the question.
   *
   * @param      {string}  [payload=""]
   */
  updateQuestionByIdFailure: (payload = "") => ({
    type: actions.UPDATE_QUESTION_FAILURE,
    payload,
  }),
};

export default actions;

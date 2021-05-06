import db from "../../models/user";
import BaseController from "../../helper/BaseController";
const { Question, Option } = db;

class QuestionClass extends BaseController {
  static async createQuestion(req, res) {
    try {
      const { body, user } = req;
      const validation = req.validate(body, "createQuestion");
      if (validation.error) {
        return res.withValidation(validation.error.details);
      }
      const { desc, options } = body;
      const createdQuestion = await Question.create({
        desc: desc,
        user: user._id,
      });
      if (createdQuestion) {
        const updatedOptions = options.map((list) => {
          list.question = createdQuestion._id;
          return list;
        });
        const createdOption = await Option.insertMany(updatedOptions);
        if (createdOption.length > 0) {
          const updateQuestion = await Question.findOneAndUpdate(
            { _id: createdQuestion._id },
            { options: createdOption },
            { new: true }
          );
          if (updateQuestion) {
            return res.withResponse("QUESTION_CREATED", null, 200);
          }
        }
      }
      return res.withResponse("INVALID_ENTRY", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }

  static async getUserQuestions(req, res) {
    try {
      const { user } = req;
      const getData = await Question.find({ user: user._id }).populate({
        path: "options",
        model: "Option",
      });
      if (getData) {
        return res.withResponse("", getData, 200);
      }
      return res.withResponse("INVALID_DATA", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }

  static async getQuestion(req, res) {
    try {
      const { user, params } = req;
      const { id } = params;
      const questionData = await Question.find({ _id: id }).populate({
        path: "options",
        select: "desc",
      });
      if (questionData) {
        return res.withResponse("", questionData, 200);
      }
      return res.withResponse("INVALID_DATA", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }

  static async updateQuestion(req, res) {
    try {
      const { body } = req;
      const validation = req.validate(body, "updateQuestion");
      if (validation.error) {
        return res.withValidation(validation.error.details);
      }
      const { _id, desc, options } = body;
      const updatedData = await Question.findOneAndUpdate(
        { _id: _id },
        { desc: desc }
      );
      if (updatedData) {
        const userData = await options.map(async (element) => {
          if (element._id) {
            const currentUpdatedData = await Option.update(
              { _id: element._id, question: _id },
              { desc: element.desc }
            );
            return currentUpdatedData;
          } else {
            const createdOption = await Option.create({
              desc: element.desc,
              question: _id,
            });
            if (createdOption) {
              await Question.update(
                { _id: _id },
                { $push: { options: createdOption } },
              );
              return createdOption
            }
          }
        });
        if (userData.length > 0) {
          return res.withResponse("UPDATED_QUESTION", null, 200);
        }
      }
      return res.withResponse("INVALID_DATA", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }
}
export default QuestionClass;

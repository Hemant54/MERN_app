import db from "../../models/user";
import BaseController from "../../helper/BaseController";
import { signToken } from "../../helper/jwt";
import { matched, generatePassword } from "../../helper/bcrypt";
const { User } = db;

class UserClass extends BaseController {
  static async createUser(req, res) {
    try {
      const { body } = req;
      const validation = req.validate(body, "createUser");
      if (validation.error) {
        return res.withValidation(validation.error.details);
      }
      const { email, password } = body;
      const checkUser = await User.find({
        email: email,
      });
      if (checkUser.length > 0) {
        return res.withResponse("INVALID_EMAIL", null, 400);
      }
      const createdUser = await User.create({
        email: email,
        password: generatePassword(password),
      });
      if (createdUser) {
        return res.withResponse("USER_CREATED", null, 200);
      }
      return res.withResponse("INVALID_ENTRY", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }

  static async logIn(req, res) {
    try {
      const { body } = req;
      const validation = req.validate(body, "createUser");
      if (validation.error) {
        return res.withValidation(validation.error.details);
      }
      const { email, password } = body;
      const getUser = await User.find({ email: email });
      if (getUser) {
        if (matched(getUser[0].password, password)) {
          const expiry = body.remember_me ? "7d" : null;
          const details = {
            id: getUser[0]._id,
            email: getUser[0].email,
          };
          const token = signToken(details, expiry);
          let { password, ...response } = JSON.parse(
            JSON.stringify(getUser[0])
          );

          return res.withResponse(
            "LOGGED_IN",
            {
              email: response.email,
              auth_token: token,
            },
            200
          );
        }
      }
      return res.withResponse("INVALID_LOGIN", null, 400);
    } catch (err) {
      return res.withResponse(err.message, null, 500);
    }
  }
}
export default UserClass;

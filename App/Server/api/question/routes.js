import express from "express";
import controller from "./controller";
import { isUser } from "../helper/jwt";
const router = express.Router();

router.post("/create", [isUser], controller.createQuestion);
router.get("/get", [isUser], controller.getUserQuestions);
router.get("/getQuestion/:id", [isUser], controller.getQuestion);
router.put("/update", [isUser], controller.updateQuestion);

export default router;

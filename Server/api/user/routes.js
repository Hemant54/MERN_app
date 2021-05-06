import express from 'express';
import controller from './controller';
const router = express.Router();

router.post('/signup', controller.createUser);
router.post('/signin', controller.logIn);

export default router;

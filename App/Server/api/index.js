import express from 'express';

import userRoutes from './user/routes';
import questionRoutes from './question/routes';

const router = express.Router();


router.use('/auth', userRoutes);
router.use('/question', questionRoutes);

export default router;

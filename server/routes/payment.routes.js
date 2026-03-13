import express from 'express';
import { authenticate } from '../middleware/authMiddleaare.js';
import { userEnrollCourse } from '../controllers/user.controllers.js';

const paymentRouter = express.Router();

// Direct course enrollment
paymentRouter.post('/purchase/:courseId', authenticate, userEnrollCourse);

export default paymentRouter;

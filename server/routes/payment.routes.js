import express from 'express';
import { authenticate } from '../middleware/authMiddleaare.js';
import { userPurchaseCourse } from '../controllers/user.controllers.js';

const paymentRouter = express.Router();

// Direct course purchase/enrollment bypass
paymentRouter.post('/purchase/:courseId', authenticate, (req, res, next) => {
    // Set a default payment method since we are bypassing Stripe
    req.body.paymentMethod = 'direct_enrollment';
    next();
}, userPurchaseCourse);

export default paymentRouter;

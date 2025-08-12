import express from 'express';
import { loginOrRegister } from '../controller/auth.controller.js';

const router = express.Router();

// POST /api/auth/login  (email-only)
router.post('/login', loginOrRegister);

export default router;

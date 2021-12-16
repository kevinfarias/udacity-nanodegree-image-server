import express from 'express';
import convert from './convert';

const router = express.Router();

router.use('/convert', convert);

export default router;
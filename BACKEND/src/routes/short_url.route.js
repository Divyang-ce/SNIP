import express from 'express';
import { createShortUrl } from '../controller/short_url.controller.js';
import { createUrlLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { createShortUrlSchema } from '../validators/shortUrl.validator.js';

const router = express.Router();

router.post("/", createUrlLimiter, validate(createShortUrlSchema), createShortUrl);

export default router;

import { BadRequestError } from "../utils/errorHandler.js";

// Wraps a zod schema into express middleware. Validates req.body,
// replaces it with the parsed (and coerced/trimmed) data, and
// forwards a clean BadRequestError on failure instead of a raw zod error.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return next(new BadRequestError(firstIssue?.message || "Invalid request data"));
  }
  req.body = result.data;
  next();
};

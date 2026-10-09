// src/config/env.validation.ts
import Joi from 'joi';

const developmentJwtSecret = 'development-jwt-secret-change-me';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  JWT_SECRET: Joi.string().min(32).when('NODE_ENV', {
    is: Joi.string().valid('development', 'test'),
    then: Joi.string().min(32).default(developmentJwtSecret),
    otherwise: Joi.string().min(32).required(),
  }),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
});
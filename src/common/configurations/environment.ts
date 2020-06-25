import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import { EnvConfig } from '../../common/interfaces/env-config';
import { readBaseJsonFile } from '../../utils/read-json-file';

const nodeEnv = process.env.NODE_ENV || 'development';
const config = dotenv.config({ path: `${nodeEnv}.env` }).parsed;

config.APP_VERSION = getVersion();
config.GSUIT_AUTH_CREDENTIALS = readBaseJsonFile('gsuite_auth_credentials');

export const envConfigs = validateInput(config);

/**
 * Ensures all needed variables are set,
 * and returns the validated JavaScript object
 * including the applied default values.
 */
function validateInput(environmentConfig: EnvConfig): EnvConfig {
  const envVarsSchema: Joi.ObjectSchema = Joi.object({
    APP_NAME: Joi.string().required(),
    APP_VERSION: Joi.string().required(),

    NODE_ENV: Joi.string()
      .valid(['development', 'production'])
      .default('development'),

    PORT: Joi.number().default(3000),

    ALLOWED_ORIGINS: Joi.string().required(),

    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),

    TYPEORM_MIGRATIONSRUN: Joi.boolean().required(),
    TYPEORM_LOGGING: Joi.boolean().required(),

    JWT_TTL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_REFRESH_TTL: Joi.number().required(),
  });

  const { error, value: validatedEnvConfig } = Joi.validate(
    environmentConfig,
    envVarsSchema,
  );
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  return validatedEnvConfig;
}

function getVersion(): string {
  const packageFile: { version: string } = readBaseJsonFile('package');
  return packageFile.version;
}

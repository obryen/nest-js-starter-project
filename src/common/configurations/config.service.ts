import { Injectable } from '@nestjs/common';
import { envConfigs as env } from './environment';

@Injectable()
export class ConfigurationService {
  get baseFolder(): string {
    const regex = /common+(\/|\\)+config/gi;
    return __dirname.replace(regex, '');
  }

  get appName(): string {
    return String(env.APP_NAME);
  }

  get appVersion(): string {
    return String(env.APP_VERSION);
  }

  get nodeEnv(): string {
    return String(env.NODE_ENV);
  }

  get port(): number {
    return Number(env.PORT);
  }

  get soapPort(): number {
    return Number(env.SOAP_PORT);
  }

  get qbUrl(): string {
    return String(env.QB_URL);
  }

  get tokenSecret(): string {
    return String(env.TOKEN_SECRET);
  }

  get cookieSecret(): string {
    return String(env.COOKIE_SECRET);
  }
  get onboardingSecret(): string {
    return String(env.ONBOARDING_SECRET);
  }

  get allowedOrigins(): RegExp {
    return new RegExp(env.ALLOWED_ORIGINS);
  }

  //#region DB Configs

  get databaseHost(): string {
    return String(env.DATABASE_HOST);
  }

  get databasePort(): number {
    return Number(env.DATABASE_PORT);
  }

  get databaseName(): string {
    return `${env.DATABASE_NAME}`;
  }

  get databaseUser(): string {
    return `${env.DATABASE_USER}`;
  }

  get typeormMigrationsrun(): boolean {
    return Boolean(env.TYPEORM_MIGRATIONSRUN);
  }
  get typeormLogging(): boolean {
    return Boolean(env.TYPEORM_LOGGING);
  }
  get databasePassword(): string {
    return String(env.DATABASE_PASSWORD);
  }

  get redisHost(): string {
    return String(env.REDIS_HOST);
  }

  get redisPort(): number {
    return Number(env.REDIS_PORT);
  }


}

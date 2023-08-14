import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import validateConfig from 'src/utils/validate-config';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { DEFAULT_API_PREFIX, DEFAULT_APP_FALLBACK_LANGUAGE, DEFAULT_APP_HEADER_LANGUAGE, DEFAULT_APP_NAME, DEFAULT_APP_PORT, DEFAULT_BACKEND_DOMAIN, DEFAULT_NODE_ENV, Environment } from 'src/utils/constants/app.config';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
    name: process.env.APP_NAME || DEFAULT_APP_NAME,
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? DEFAULT_BACKEND_DOMAIN,
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : DEFAULT_APP_PORT,
    apiPrefix: process.env.API_PREFIX || DEFAULT_API_PREFIX,
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || DEFAULT_APP_FALLBACK_LANGUAGE,
    headerLanguage: process.env.APP_HEADER_LANGUAGE || DEFAULT_APP_HEADER_LANGUAGE,
  };
});

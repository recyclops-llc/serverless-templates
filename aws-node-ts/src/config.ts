import { LoggerService } from './common/utils/logger';
import { LogLevel } from './schemas';

function getEnvString(key: string, required = false): string | undefined {
  const val = process.env[key];

  if (val === undefined && required === true) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return val;
}

// set config variables
const stage = getEnvString('STAGE', true);

const aws = {
  region: getEnvString('AWSREGION', true)
};

// if no log level provided, set to default level of DEBUG
const logLevel: LogLevel = LogLevel[getEnvString('LOG_LEVEL', false) as keyof typeof LogLevel] || LogLevel.DEBUG;
const logger = new LoggerService(logLevel);

// TODO: Add other config variables as needed below

export default {
  aws,
  logger,
  stage
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LogLevel } from '../../schemas';

/**
 * This class is meant to handle all logging in order to ensure logs follow the same format and have the same basic properties.
 */
export class LoggerService {
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }

  private isEnabled(level: LogLevel): boolean {
    return level >= this.logLevel;
  }

  private appendError(params: any, err?: Error): any {
    if (!err) {
      return params;
    }

    return {
      ...(params || {}),
      errorName: err.name,
      errorMessage: err.message,
      stackTrace: err.stack
    };
  }

  private log(level: LogLevel, message: string, params?: any) {
    if (this.isEnabled(level)) {
      const logMsg = { timestamp: new Date().toISOString(), message, data: params, level: LogLevel[level] };

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(logMsg));
    }
  }

  public debug(msg: string, params?: any): void {
    this.log(LogLevel.DEBUG, msg, params);
  }

  public info(msg: string, params?: any): void {
    this.log(LogLevel.INFO, msg, params);
  }

  public warn(msg: string, params?: any, error?: Error): void {
    this.log(LogLevel.WARN, msg, this.appendError(params, error));
  }

  public error(msg: string, params?: any, error?: Error): void {
    this.log(LogLevel.ERROR, msg, this.appendError(params, error));
  }
}

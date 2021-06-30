import { LogLevel } from '../../schemas';
import { LoggerService } from './logger';

let loggerService: LoggerService;
let privateLogFunction: jest.SpyInstance;
let privateAppendErrorFunction: jest.SpyInstance;
let message: string;
let params: { foo: string; abc: number };
let error: Error;
let errorAppended: {
  foo: string;
  abc: number;
  errorName: string;
  errorMessage: string;
  stackTrace: string | undefined;
};

describe('LoggerService', () => {
  beforeAll(() => {
    loggerService = new LoggerService(LogLevel.DEBUG);

    message = 'message';
    params = { foo: 'bar', abc: 123 };

    error = new Error('errorMessage');

    errorAppended = {
      ...params,
      errorName: error.name,
      errorMessage: error.message,
      stackTrace: error.stack
    };
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    privateLogFunction = jest.spyOn(LoggerService.prototype as any, 'log');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    privateAppendErrorFunction = jest.spyOn(LoggerService.prototype as any, 'appendError');
    privateAppendErrorFunction.mockImplementation(() => errorAppended);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call log() with proper parameters - debug', () => {
    // arrange

    // act
    loggerService.debug(message, params);

    // assert
    expect(privateLogFunction).toHaveBeenCalledTimes(1);
    expect(privateLogFunction).toHaveBeenCalledWith(LogLevel.DEBUG, message, params);
  });

  it('should call log() with proper parameters - info', () => {
    // arrange

    // act
    loggerService.info(message, params);

    // assert
    expect(privateLogFunction).toHaveBeenCalledTimes(1);
    expect(privateLogFunction).toHaveBeenCalledWith(LogLevel.INFO, message, params);
  });

  it('should call log() with proper parameters - warn', () => {
    // arrange

    // act
    loggerService.warn(message, params, error);

    // assert
    expect(privateAppendErrorFunction).toHaveBeenCalledTimes(1);
    expect(privateAppendErrorFunction).toHaveBeenCalledWith(params, error);

    expect(privateLogFunction).toHaveBeenCalledTimes(1);
    expect(privateLogFunction).toHaveBeenCalledWith(LogLevel.WARN, message, errorAppended);
  });

  it('should call log() with proper parameters - error', () => {
    // arrange

    // act
    loggerService.error(message, params, error);

    // assert
    expect(privateAppendErrorFunction).toHaveBeenCalledTimes(1);
    expect(privateAppendErrorFunction).toHaveBeenCalledWith(params, error);

    expect(privateLogFunction).toHaveBeenCalledTimes(1);
    expect(privateLogFunction).toHaveBeenCalledWith(LogLevel.ERROR, message, errorAppended);
  });
});

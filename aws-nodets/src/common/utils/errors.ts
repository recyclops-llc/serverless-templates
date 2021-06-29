/** Throw this error to have Lambda function return specific status code and error message in API Gateway response */
export class APIStatusCodeError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

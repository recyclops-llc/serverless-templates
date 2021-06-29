import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { APIHandlerResponse, APIGatewayResponse } from '../../schemas';
import { APIStatusCodeError } from '../utils/errors';
import config from '../../config';

export type APIGatewayHandler = (event: APIGatewayProxyEvent, context?: Context) => Promise<APIHandlerResponse>;

function addCorsHeaders(response: { statusCode: number; body: string }): APIGatewayResponse {
  return {
    body: response.body,
    statusCode: response.statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  };
}

/** Wraps all API Lambda handlers with common middleware to add correct headers and handle errors */
export function apiGatewayHandlerWrapper(
  handler: APIGatewayHandler
): (event: APIGatewayProxyEvent, context?: Context) => Promise<APIGatewayResponse> {
  return async (event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayResponse> => {
    try {
      // call handler
      const result: APIHandlerResponse = await handler(event, context);

      // return result
      return addCorsHeaders(result);
    } catch (e) {
      if (e instanceof APIStatusCodeError) {
        config.logger.warn('StatusCodeError', { event, context }, e);

        return addCorsHeaders({
          statusCode: e.statusCode,
          body: JSON.stringify({
            error: e.message
          })
        });
      }
      config.logger.error('Unhandled error', { event, context }, e);

      return addCorsHeaders({
        statusCode: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    }
  };
}

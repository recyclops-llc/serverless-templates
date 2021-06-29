import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { APIStatusCodeError } from '../../common/utils/errors';
import { apiGatewayHandlerWrapper } from '../../common/middleware/apigw';
import config from '../../config';
import { APIHandlerResponse } from '../../schemas';

// TODO: replace "any" type with the correct interface type
function validateRequestBody(body: any): string[] {
  config.logger.debug('Validating the request body', body);

  const missingFields: string[] = [];

  // validation logic here

  return missingFields;
}

export const handler: APIGatewayProxyHandler = apiGatewayHandlerWrapper(
  async (event: APIGatewayProxyEvent): Promise<APIHandlerResponse> => {
    // verify event body exists
    if (!event.body) {
      throw new APIStatusCodeError(400, 'No request body found');
    }

    // TODO: replace "any" type with correct interface that matches the shape of the expected request body
    const orderRequestBody: any = JSON.parse(event.body);

    try {
      // validate request body
      const missingFields: string[] = validateRequestBody(orderRequestBody);

      if (missingFields.length > 0) {
        throw new APIStatusCodeError(400, `The following fields are missing:  ${missingFields.join(',')}`);
      }

      // call appropriate service to handle the request
      const result = undefined;

      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    } catch (e) {
      config.logger.error(e.toString());
      throw new APIStatusCodeError(500, 'Server error');
    }
  }
);

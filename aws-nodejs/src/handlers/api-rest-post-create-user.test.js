import { expect } from '@jest/globals';
import handler from './api-rest-post-create-user';

describe('api-rest-post-create-user', () => {
  // beforeAll(() => {
  // });

  test('handler-200 response', async () => {
    // Setup
    const event = {};

    const expectedResult = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event
        },
        null,
        2
      )
    };

    // Execute
    const actualResult = await handler(event);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });
});

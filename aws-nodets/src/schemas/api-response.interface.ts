import { APIGatewayProxyResult } from 'aws-lambda';

type AccessControlAllowOrigin = '*';
type ContentType = 'application/json';

export interface APIHandlerResponse {
  statusCode: number;
  body: string;
}

export interface APIGatewayResponse extends APIHandlerResponse, APIGatewayProxyResult {
  headers: {
    'Access-Control-Allow-Origin': AccessControlAllowOrigin;
    'Content-Type': ContentType;
  };
}

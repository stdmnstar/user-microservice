import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import sender from './handler';

const context = {} as Context;

jest.mock('../../service/sqs');

describe('deleteUserByIp lambda', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should return statusCode: 200 (OK)', async () => {
    const mEvent = {
      pathParameters: {
        id: '1',
      },
    } as unknown as APIGatewayProxyEvent;

    const mResponse = {
      statusCode: StatusCodes.OK,
    };

    const response = await sender(mEvent, context);
    expect(response).toMatchObject(mResponse);
  });

  test('should return statusCode: 400 (Bad request)', async () => {
    const mEvent = {
      pathParameters: {},
    } as unknown as APIGatewayProxyEvent;

    const mResponse = {
      statusCode: StatusCodes.BAD_REQUEST,
    };

    const responce = await sender(mEvent, context);
    expect(responce).toMatchObject(mResponse);
  });
});

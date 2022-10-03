import { SqsService } from './sqs';

jest.mock('aws-sdk', () => {
  return {
    SQS: jest.fn().mockImplementation(() => {
      return {
        sendMessage: jest.fn(),
      };
    }),
  };
});

describe('SqsService', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('getUrl', () => {
    test('should return correct url', () => {
      const queueName = 'queueName';
      const invokedFunctionArn = ' ffff:yyyy:7777:dddd:4444';
      const mResponse = 'https://sqs.dddd.amazonaws.com/4444/queueName';

      const sqsService = new SqsService();
      const response = sqsService.getUrl(queueName, invokedFunctionArn);
      expect(response).toMatch(mResponse);
    });
  });
});

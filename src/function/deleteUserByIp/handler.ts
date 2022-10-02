import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { SqsService } from '../../service/sqs';
import { responseMessage } from '../../utils';

const queueName = 'sqsQueue';
const sqsService = new SqsService();

const sender = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const userId = event!.pathParameters!['id'];
  if (!userId) {
    return responseMessage(StatusCodes.BAD_REQUEST, 'No param ID was found');
  }

  const queueUrl: string = sqsService.getUrl(queueName, context.invokedFunctionArn);
  try {
    await sqsService.sendMessages(queueUrl, [userId]);
  } catch (error) {
    console.log(error);
    return responseMessage(StatusCodes.INTERNAL_SERVER_ERROR, error as string);
  }

  return responseMessage(StatusCodes.OK, 'Message placed in the Queue!');
};

export default sender;

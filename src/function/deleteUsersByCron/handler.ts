import { UserController } from '../../controller/users';
import { AppDataSource, initDataSource } from '../../data-source';
import User from '../../model/user';
import { Context, SQSEvent } from 'aws-lambda';
import { SqsService } from '../../service/sqs';

const queueName: string = 'sqsQueue';
const daysForObfuscate = 14;

const sqsService = new SqsService();

const sender = async (_event: SQSEvent, context: Context): Promise<void> => {
  await initDataSource;

  const repository = AppDataSource.getRepository(User);
  const userController = new UserController(repository);
  const ids = await userController.getUserIdsForObfuscateByDays(daysForObfuscate);

  if (ids.length === 0) return;

  const queueUrl: string = sqsService.getUrl(queueName, context.invokedFunctionArn);
  try {
    await sqsService.sendMessages(queueUrl, ids);
  } catch (error) {
    console.log(error);
  }
};

export default sender;

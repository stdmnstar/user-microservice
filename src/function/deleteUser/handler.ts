import { SQSEvent, SQSHandler } from 'aws-lambda';
import { Repository } from 'typeorm';
import { UserController } from '../../controller/users';
import { AppDataSource, initDataSource } from '../../data-source';
import User from '../../model/user';

const receiver: SQSHandler = async (event: SQSEvent) => {
  await initDataSource;

  const repository: Repository<User> = AppDataSource.getRepository(User);
  const userController = new UserController(repository);
  try {
    for (const record of event.Records) {
      await userController.deleteOne(+record.body);
    }
  } catch (error) {
    console.log(error);
  }
};

export default receiver;

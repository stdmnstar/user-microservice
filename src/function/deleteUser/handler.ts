import { UserController } from '../../controller/users';
import { AppDataSource, initDataSource } from '../../data-source';
import User from '../../model/user';


module.exports.deleteOne = async (event: unknown) => {
  await initDataSource;

  const repository = AppDataSource.getRepository(User);
  const userController = new UserController(repository);
  return userController.deleteOne(event);
};

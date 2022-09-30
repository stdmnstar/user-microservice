import { UserController } from '../controller/users';
import { AppDataSource, initDataSource } from '../data-source';
import User from '../model/user';


const deleteOn = async (event: unknown) => {
  await initDataSource;

  const repository = AppDataSource.getRepository(User);
  const userController = new UserController(repository);
  return userController.deleteOn(event);
};

module.exports = { deleteOn }

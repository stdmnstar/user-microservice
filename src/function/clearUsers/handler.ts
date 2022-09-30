import { UserController } from "../../controller/users";
import { AppDataSource, initDataSource } from "../../data-source";
import User from "../../model/user";


module.exports.deleteByTime = async () => {
  await initDataSource;

  const repository = AppDataSource.getRepository(User);
  const userController = new UserController(repository);
  return userController.deleteByTime();
};

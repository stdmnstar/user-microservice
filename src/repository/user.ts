import { AppDataSource } from '../data-source';
import User, { IUser, IUserRequest } from '../entity/user';

const repository = AppDataSource.getRepository(User)

const getById = async (userId: number) => repository.findOneBy({ id: userId })

const create = async (user: IUserRequest) => repository.save(user)

const update = async (userId: number, data: Partial<IUser>) => {
  await repository.update(userId, data)
  const user = await getById(userId)
  return user!
}

export default {
  getById,
  create,
  update,
};

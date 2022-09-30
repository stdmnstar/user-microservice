import usersRepo from '../repository/user';
import { IUser, IUserRequest } from '../entity/user';

const obfuscateUser: Partial<IUser> = {
  email: '',
  firstName: '',
  lastName: '',
  isObfuscated: true,
  globalId: ''
}

const getById = async (userId: number): Promise<IUser | null> => usersRepo.getById(userId);

const create = async (user: IUserRequest): Promise<IUser> => usersRepo.create(user);

const obfuscate = async (userId: number): Promise<IUser> => usersRepo.update(userId, obfuscateUser);

export default { getById, create, obfuscate };

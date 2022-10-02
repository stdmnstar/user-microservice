import { Repository } from 'typeorm';
import User, { IUser } from '../model/user';

export class UserService {
  private repository: Repository<User>;
  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  protected async obfuscate(id: number): Promise<IUser> {
    const obfuscatedUser: Partial<IUser> = {
      email: '',
      firstName: '',
      lastName: '',
      isObfuscated: true,
      globalId: '',
    };

    await this.repository.update(id, obfuscatedUser);
    const user = await this.repository.findOneBy({ id });
    return user!;
  }

  protected async getUsersForObfuscate(days: number): Promise<number[]> {
    const dateOfObfuscated = new Date();
    dateOfObfuscated.setDate(dateOfObfuscated.getDate() - days);

    const users: User[] = await this.repository
      .createQueryBuilder('user')
      .select(['user.id'])
      .where('user.isObfuscated = :isObfuscated', { isObfuscated: true })
      .andWhere('user.createdAt < :dateOfObfuscated', { dateOfObfuscated })
      .getMany();

    return users.map((user) => user.id);
  }
}

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

  protected async clearByTime(days: number) {
    const dateOfObfuscated = new Date();
    dateOfObfuscated.setDate(dateOfObfuscated.getDate() - days);

    const users = await this.repository
      .createQueryBuilder('user')
      .where('user.isObfuscated = :isObfuscated', { isObfuscated: true })
      .andWhere('user.createdAt < :dateOfObfuscated', { dateOfObfuscated })
      .getMany();

    // TODO add  users to SQS
    console.log(users);

    //or withoutSQS
    // const users1 = await this.repository
    //   .createQueryBuilder("user")
    //   .update(User)
    //   .where('user.isObfuscated = :isObfuscated', { isObfuscated: true })
    //   .andWhere('user.createdAt < :twoWeekAgo', { twoWeekAgo: twoWeekAgo })
    //   .execute()

    //   return users1;
  }
}

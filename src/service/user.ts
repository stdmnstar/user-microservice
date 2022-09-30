import { Repository } from 'typeorm';
import User, { IUser } from '../model/user';

const daysForObfuscate = 14;

export class UserService {
  private repository: Repository<User>;
  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  protected async obfuscate(id: number): Promise<IUser> {
    const obfuscateUser: Partial<IUser> = {
      email: '',
      firstName: '',
      lastName: '',
      isObfuscated: true,
      globalId: ''
    };

    await this.repository.update(id, obfuscateUser);
    const user = await this.repository.findOneBy({ id })
    return user!
  }

  protected async clearByTime() {
    let twoWeekAgo = new Date();
    twoWeekAgo.setDate(twoWeekAgo.getDate() - daysForObfuscate)


    const users = await this.repository
      .createQueryBuilder("user")
      .where('user.isObfuscated = :isObfuscated', { isObfuscated: true })
      .andWhere('user.createdAt < :twoWeekAgo', { twoWeekAgo: twoWeekAgo })
      .getMany()

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

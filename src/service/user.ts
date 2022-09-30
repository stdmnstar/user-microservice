import { Repository } from 'typeorm';
import User, { IUser } from '../model/user';

export class UserService {
  private repository: Repository<User> ;
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
}

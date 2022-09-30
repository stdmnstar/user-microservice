import { Repository } from 'typeorm';
import User from '../model/user';
import { UserService } from '../service/user';

export class UserController extends UserService {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  async deleteOn(event:any) {
    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.obfuscate(id);
      return result;
    } catch (err) {
      console.error(err);
      return { message: 'error' };
    }
  }
}

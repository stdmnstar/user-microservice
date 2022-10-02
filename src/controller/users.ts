import { Repository } from 'typeorm';
import User from '../model/user';
import { UserService } from '../service/user';

export class UserController extends UserService {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.obfuscate(id);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserIdsForObfuscateByDays(days: number): Promise<number[]> {
    try {
      return this.getUsersForObfuscate(days);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

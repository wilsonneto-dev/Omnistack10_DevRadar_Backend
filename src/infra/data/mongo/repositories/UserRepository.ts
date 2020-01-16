import IUserRepository from 'domain/interfaces/repositories/IUserRepository';
import User from 'domain/entities/User';

import UserCollection from '../collections/UserCollection';

class UserRepository implements IUserRepository {
  async store(user: User): Promise<User> {
    return <User>await UserCollection.create(user);
  }

  async getById(id: string): Promise<User> {
    return <User>await UserCollection.findById(id);
  }
}

export default UserRepository;

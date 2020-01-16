import IUserRepository from 'domain/interfaces/repositories/IUserRepository';
import User from 'domain/entities/User';

import UserCollection from '../collections/UserCollection';

class UserRepository implements IUserRepository {
  async store(user: User): Promise<User> {
    return await (<User>UserCollection.create(user));
  }
}

export default UserRepository;

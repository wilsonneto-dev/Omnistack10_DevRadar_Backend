import IUserRepository from 'domain/interfaces/repositories/IUserRepository';
import User from 'domain/entities/User';

import UserCollection from '../collections/UserCollection';

class UserRepository implements IUserRepository {
  async store(user: User): Promise<User> {
    return <User>await UserCollection.create(user);
  }

  async getById(id: string): Promise<User | null> {
    return <User | null>await UserCollection.findById(id);
  }

  async getByUser(username: string): Promise<User | null> {
    return <User | null>await UserCollection.findOne({ github_name: username });
  }

  async getAll(): Promise<Array<User>> {
    return <Array<User>>await UserCollection.find();
  }
}

export default UserRepository;

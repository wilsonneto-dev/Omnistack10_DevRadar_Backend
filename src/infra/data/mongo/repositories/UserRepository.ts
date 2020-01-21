import IUserRepository from 'domain/interfaces/repositories/IUserRepository';
import User from 'domain/entities/User';
import Location from 'domain/entities/Location';

import UserCollection from '../collections/UserCollection';
import mapper from '../mappers/UserMapper';

class UserRepository implements IUserRepository {
  async store(user: User): Promise<User | null> {
    const userOnSchema: any = mapper.toSchema(user);
    const savedSchema: any = await UserCollection.create(userOnSchema);

    return mapper.toUser(savedSchema);
  }

  async getById(id: string): Promise<User | null> {
    const resultSchema = await UserCollection.findById(id);
    return mapper.toUser(resultSchema);
  }

  async getByUser(username: string): Promise<User | null> {
    return <User | null>await UserCollection.findOne({ github_name: username });
  }

  async getAll(): Promise<Array<User>> {
    return <Array<User>>await UserCollection.find();
  }

  async search(
    arrTechs: Array<string>,
    location: Location,
  ): Promise<Array<User>> {
    return <Array<User>>await UserCollection.find({
      techs: {
        $in: arrTechs,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
          $maxDistance: 10000,
        },
      },
    });
  }
}

export default UserRepository;

import User from 'domain/entities/User';

interface IUserRepository {
  store(user: User): Promise<User>;
}

export default IUserRepository;

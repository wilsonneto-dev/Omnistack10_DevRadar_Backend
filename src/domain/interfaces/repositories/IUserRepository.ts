import User from 'domain/entities/User';

interface IUserRepository {
  store(user: User): Promise<User>;
  getById(id: string): Promise<User>;
}

export default IUserRepository;

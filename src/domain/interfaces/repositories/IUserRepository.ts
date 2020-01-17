import User from 'domain/entities/User';

interface IUserRepository {
  store(user: User): Promise<User>;
  getById(id: string): Promise<User | null>;
  getByUser(username: string): Promise<User | null>;
  getAll(): Promise<Array<User>>;
}

export default IUserRepository;

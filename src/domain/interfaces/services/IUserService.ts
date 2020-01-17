import User from '../../entities/User';

interface IUserService {
  store(user: User): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getByUser(username: string): Promise<User | null>;
  getAll(): Promise<Array<User>>;
}

export default IUserService;

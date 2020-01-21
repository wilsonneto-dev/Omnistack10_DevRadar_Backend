import User from '../../entities/User';
import Location from '../../entities/Location';

interface IUserService {
  /* data persistence */
  store(user: User): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  getByUser(username: string): Promise<User | null>;
  getAll(): Promise<Array<User>>;
  search(arrTechs: Array<string>, location: Location): Promise<Array<User>>;
}

export default IUserService;

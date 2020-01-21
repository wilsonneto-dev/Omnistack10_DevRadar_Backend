import IUserService from 'domain/interfaces/services/IUserService';
import User from 'domain/entities/User';
import IUserRepository from 'domain/interfaces/repositories/IUserRepository';
import Location from 'domain/entities/Location';

class UserService implements IUserService {
  private _userRepository: IUserRepository;

  constructor(_userRepository: IUserRepository) {
    this._userRepository = _userRepository;
  }

  public async store(user: User): Promise<User | null> {
    return this._userRepository.store(user);
  }

  public async getById(id: string): Promise<User | null> {
    return this._userRepository.getById(id);
  }

  public async getByUser(username: string): Promise<User | null> {
    return this._userRepository.getByUser(username);
  }

  public async getAll(): Promise<Array<User>> {
    return this._userRepository.getAll();
  }

  search(arrTechs: Array<string>, location: Location): Promise<User[]> {
    return this._userRepository.search(arrTechs, location);
  }
}

export default UserService;

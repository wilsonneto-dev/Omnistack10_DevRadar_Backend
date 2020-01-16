import IUserService from 'domain/interfaces/services/IUserService';
import User from 'domain/entities/User';
import IUserRepository from 'domain/interfaces/repositories/IUserRepository';

class UserService implements IUserService {
  private _userRepository: IUserRepository;

  constructor(_userRepository: IUserRepository) {
    this._userRepository = _userRepository;
  }

  public async store(user: User): Promise<User> {
    return this._userRepository.store(user);
  }

  public async getById(id: string): Promise<User> {
    return this._userRepository.getById(id);
  }
}

export default UserService;

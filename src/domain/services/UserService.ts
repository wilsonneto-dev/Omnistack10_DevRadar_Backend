import IUserService from 'domain/interfaces/services/IUserService';
import User from 'domain/entities/User';
import IUserRepository from 'domain/interfaces/repositories/IUserRepository';

class UserService implements IUserService {
  private _userRepository: IUserRepository;

  constructor(_userRepository: IUserRepository) {
    this._userRepository = _userRepository;
  }

  public store(user: User): User {
    return this._userRepository.store(user);
  }
}

export default UserService;

import User from '../../entities/User';

interface IUserService {
  store(user: User): User;
}

export default IUserService;

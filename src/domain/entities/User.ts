import Location from './Location';

class User {
  id?: number;
  name?: String;
  avatar_url?: String;
  github_name?: String;
  bio?: String;
  techs?: Array<string>;

  location?: Location;

  constructor() {}
}

export default User;

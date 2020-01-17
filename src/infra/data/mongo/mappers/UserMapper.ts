import User from '../../../../domain/entities/User';
import Location from '../../../../domain/entities/Location';

class UserMapper {
  public static toSchema(user: User): object | null {
    if (!user) return null;

    return {
      name: user.name,
      github_name: user.github_name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      techs: user.techs,
      location: {
        type: 'Point',
        coordinates: [user.location?.longitude, user.location?.latitude],
      },
    };
  }

  public static toUser(props: any): User | null {
    if (!props) return null;

    const user: User = new User();
    user.name = props.name;
    user.github_name = props.name;
    user.bio = props.bio;
    user.id = props._id;
    user.techs = props.techs;
    user.avatar_url = props.avatar;

    if (props.location) {
      user.location = new Location();
      user.location.longitude = props.location.coordinates[0];
      user.location.latitude = props.location.coordinates[1];
    }

    return user;
  }

  public static toListUser(docList: any): Array<User> {
    if (docList && docList.map) {
      return docList.map((item: any): User | null => UserMapper.toUser(item));
    }
    return [];
  }
}

export default UserMapper;

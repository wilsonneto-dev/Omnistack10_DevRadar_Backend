import mongoose /*, { Document }*/ from 'mongoose';
/*
interface IUserDocument extends Document {
  name: string;
  github_name: string;
  bio: string;
  avatar_url: string;
  teachs: Array<string>;
}
*/
const UserSchema = new mongoose.Schema({
  name: String,
  github_name: String,
  bio: String,
  avatar_url: String,
  techs: [String],
});

export default mongoose.model(/*<IUserDocument>*/ 'User', UserSchema);

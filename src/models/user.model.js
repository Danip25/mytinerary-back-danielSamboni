import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  avatar: {
    type: String,
    default:
      'https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
});

export default model('User', UserSchema);

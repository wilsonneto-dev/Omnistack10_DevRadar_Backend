import mongoose from 'mongoose';

export default {
  setup: (connectionString: string): void => {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
};

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v: any) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'password cant be lower than 6 characters'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
      lowercase: true,
      trim: true,
      minlength: 4,
      maxlength: 50,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    images: [{ img: { type: String, unique: true, required: true } }],
    city: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      required: true,
      enum: ['person', 'company'],
    },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

export default mongoose.models.Ad || mongoose.model('Ad', AdSchema);

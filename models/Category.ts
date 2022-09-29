import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

// Virtual populate
CategorySchema.virtual('ads', {
  ref: 'Ad',
  foreignField: 'category',
  localField: '_id',
  count: true,
});

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);

import mongoose from 'mongoose';
import slugUpdater from 'mongoose-slug-updater';
mongoose.plugin(slugUpdater);

const petSchema = new mongoose.Schema(
  {
    name: String,
    gene: String,
    age: Number,
    price: Number,
    avt: String,
    images: [{ type: String }],
    size: String,
    color: String,
    vacinated: String,
    dewormed: String,
    cert: String,
    location: String,
    additional_info: String,
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    uploadBy: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PetModel = mongoose.model('PetModel', petSchema, 'pet');

export default PetModel;

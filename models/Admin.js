import mongoose from "mongoose";
const { model, Schema } = mongoose;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default  mongoose.models.Admin || mongoose.model('Admin', adminSchema);


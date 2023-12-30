import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: String,
});

export default  mongoose.models.User || mongoose.model('User', userSchema);

// export default model("User", userSchema);

// // import mongoose, { Schema, models } from "mongoose";

// // const UserSchema = new Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   passwordHash: { type: String, required: true },
// // });

// // // Prevent model overwrite on hot reload
// // export default models.User || mongoose.model("User", UserSchema);


// // src/models/User.ts
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
// }

// const UserSchema: Schema<IUser> = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// src/app/api/auth/register/route.ts
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;


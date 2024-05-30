import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required !!"],
    },
    password: {
        type : String,
        required : true,
    },
    about : String,
    profileURL: String,
});

export const User = mongoose.models.users || mongoose.model("users", UserSchema);
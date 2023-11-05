import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telephone: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    email_active: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

const User = mongoose.model("User",UserSchema);

export default User;
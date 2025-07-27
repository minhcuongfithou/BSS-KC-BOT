import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
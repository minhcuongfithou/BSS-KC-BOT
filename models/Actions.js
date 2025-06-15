import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
    callback: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    action: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    }
});

const Action = mongoose.models.Action || mongoose.model('Action', actionSchema);
export default Action;

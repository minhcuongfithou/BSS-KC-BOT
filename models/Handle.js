import mongoose from 'mongoose';

const handleSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
    },
    actionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action',
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    params: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    deletedAt: {
        type: mongoose.Schema.Types.Date
    },

}, { timestamps: true });

const Handle = mongoose.models.Handle || mongoose.model('Handle', handleSchema);
export default Handle;

import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    describe: {
        type: String,
        required: true,
    },
    coreJs: {
        type: String,
        required: true,
    },
    listAction: {
        type: String,
        required: true,
    },
    listFilter: {
        type: Array,
        required: true,
    }
});

const Action = mongoose.models.Action || mongoose.model('Action', actionSchema);
export default Action;
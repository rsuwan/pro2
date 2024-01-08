import mongoose,{Schema, model} from 'mongoose'

const userSchema =  new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

logSchema.index({ email: 1 }, { unique: true });
module.exports = mongoose.model('log', logSchema);
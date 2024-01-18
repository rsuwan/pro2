import mongoose,{Schema, model} from 'mongoose'

const logSchema =  new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'user'],
        required: true
    },
    state_us: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true
    }
});
const logModel= mongoose.models.Log||model('Log',logSchema);
export default logModel;
import mongoose,{Schema, model} from 'mongoose'

const logSchema =  new Schema({
    email: {
        type: String,
      required: [true, "Email is required"],
    },
    role: {
        type: String,
        default:'User',
        enum: ['SuperAdmin', 'Admin', 'User'],
    },
    state_us: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
      required: [true, "Password is required"],
    }
});
const logModel= mongoose.models.Log||model('Log',logSchema);
export default logModel;
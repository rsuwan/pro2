import mongoose,{Schema, model} from 'mongoose'
const userSchema =  new Schema({
    email: {
        type: String,       
        required: [true, ' email is required'],
        unique: true
    },
    first_name: {
        type: String,
        required: [true, 'first_name  is required'],
    },
    last_name: {
        type: String,
        required: [true, 'last_name is required'],
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    state_us: {
        type: Boolean,
    },
    admin_email: {
        type: String,
    },
    birth_date: {
        type: Date,
        // required: true,
        // default: new Date()
    },
    created_date: {
        type: Date,
        // required: true,
        default: new Date()
    },
    address: {
        type: String,
    },
    profile_cover: {
        type: Object,
        contentType: String,
    },
    role:{
type:String, 
default: " "
    }
})

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('user', userSchema);

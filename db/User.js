import mongoose,{Schema, model} from 'mongoose'
const userSchema =  new Schema({
    email: {
        type: String,       
         required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    pio: {
        type: String,
    },
    state_us: {
        type: Boolean,
    },
    admin_email: {
        type: String,
    },
    barth_date: {
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
        type: Buffer,
        contentType: String,
    }
});

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('user', userSchema);
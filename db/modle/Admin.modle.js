import mongoose,{Schema, model} from 'mongoose'
const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        require: true
    },
    first_name: {
        type:String,
        require: true
    },
    last_name: {
        type:String,
        require: true
    },
    phone: {
        type:String,
        require: false
    },
    pio: {
        type:String,
        require: false
    },
    created_by: {
        type: String,
        require: false,
    },
    state_us: {
        type: Boolean,
        require: true,
        default: true,
    },
    disabled_by: {
        type:String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    community_id: {
        type: String,
        require: true
    },
    birth_date: {
        type: Date,

    },
    created_date: {
        type: Date,
        required: true,
        default: new Date()
    },
    profile_cover: {
        type: String,
        require: false
    }},{

        timestamps:true,
    })


const adminModel= mongoose.models.Admin||model('Admin',adminSchema);
export default adminModel;
import mongoose,{Schema, model} from 'mongoose'
const adminSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    first_name: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    last_name: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    phone: {
        type: mongoose.SchemaTypes.String,
        require: false
    },
    pio: {
        type: mongoose.SchemaTypes.String,
        require: false
    },
    created_by: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    state_us: {
        type: mongoose.SchemaTypes.Boolean,
        require: true,
        default: true,
    },
    disabled_by: {
        type: mongoose.SchemaTypes.String,
        require: false
    },
    address: {
        type: mongoose.SchemaTypes.String,
        require: false
    },
    community_id: {
        type: mongoose.SchemaTypes.String,
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
        type: mongoose.SchemaTypes.String,
        require: false
    },
})

const adminModel= mongoose.models.Admin||model('Admin',adminSchema);
export default adminModel;
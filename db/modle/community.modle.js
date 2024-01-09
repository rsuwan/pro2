import mongoose,{Schema, model,Types} from 'mongoose'
const communitySchema =  new Schema({
   
    community_name: {
        type: String,
        required: true,
        unique: true
    },
    descreption: {
        type: String,
        required: true
    },
    created_by: {
        type: Types.ObjectId,ref:'Admin'
    },
    cover_image: {
        type: Object,

    },{

        timestamps:true,
    })
const communityModel= mongoose.models.Community||model('Community',communitySchema);
export default communityModel;

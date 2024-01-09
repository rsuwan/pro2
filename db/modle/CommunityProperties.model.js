import mongoose,{Schema, model,Types} from 'mongoose'
const communityPropertiesSchema = new mongoose.Schema({
  community_Name: {
    type: String,
    required: true
  },
  property: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  customer_fill: {
    type: Boolean,
    required: true
  },
  owner_fill: {
    type: Boolean,
    required: true
  }
});
const communityPropertiesSchemaModel= mongoose.models.communityProperties||model('communityProperties',communityPropertiesSchema);
export default communityPropertiesSchemaModel;

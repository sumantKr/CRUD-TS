import mongoose from "mongoose";
import { Post } from "../Post.interface";
import { schemaName as UserSchemaName } from "../../User/model/User.model";
export const schemaName ="Post";
const postSchema = new mongoose.Schema({
    postId:{
        type:mongoose.SchemaTypes.Number,
        require:true
    },
    title:{
        type:mongoose.SchemaTypes.String,
        require:true
    },
    content:{
        type:mongoose.SchemaTypes.String,
        require:true
    },
    authors:[{
        type:mongoose.Types.ObjectId,
        ref:UserSchemaName
    }],    
  });
   
  const postModel = mongoose.model<Post & mongoose.Document>(schemaName, postSchema);
   
  export default postModel;
import mongoose, { Schema } from "mongoose";
import { schemaName as PostSchemaName } from "../../Post/model/Post.model";
import { User } from "../User.interface";

export const schemaName = "User";
const userSchema = new Schema({
    name: {
        type: mongoose.SchemaTypes.String
    },
    email: {
        type: mongoose.SchemaTypes.String
    },
    password: {
        type: mongoose.SchemaTypes.String
    },
    // posts: [{
    //     ref: PostSchemaName,
    //     type: mongoose.SchemaTypes.ObjectId
    // }]
    twoFactorAuthenticationCode:{
        type:mongoose.SchemaTypes.Buffer
    },
    isTwoFactorAuthenticationEnabled:{
        type: mongoose.SchemaTypes.Boolean,
        default:false
    }
})

const userModel = mongoose.model<User & mongoose.Document>(schemaName, userSchema);

export default userModel;
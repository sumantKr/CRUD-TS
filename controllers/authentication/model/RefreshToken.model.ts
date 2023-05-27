import mongoose from "mongoose";
import { schemaName as userSchemaName } from "../../User/model/User.model";
import { IRefreshToken } from "../token.interface";
export const schemaName = "RefreshToken";
const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: mongoose.SchemaTypes.String
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: userSchemaName
    },
    expiryDate: Date,
})


const RefreshTokenModel = mongoose.model<IRefreshToken & mongoose.Document>(schemaName, refreshTokenSchema)

 export default RefreshTokenModel
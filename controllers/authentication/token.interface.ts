
export interface ITokenData {
    token: string;
    expiresIn: number;
}

export interface IDataStoredInToken {
    _id: string;
    isSecondFactorAuthenticated:boolean
}

export interface IRefreshToken {
    token:String,
    user:Object,
    expiresIn:number
}
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";



const setUser = (state: AuthState, action: PayloadAction<AuthState>) => {
    const { name, isTwofactorAuthenticationEnabled, email } = action.payload.user
    const user = {
        name,
        email,
        isTwofactorAuthenticationEnabled
    }
    return { user, isLoggedIn: true }
}
const resetUser = (state: AuthState) => {
    return { user: {}, isLoggedIn: false }
}


export const userReducers = {
    resetUser,
    setUser
}
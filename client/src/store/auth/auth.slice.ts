import { createSlice } from "@reduxjs/toolkit"
import { AuthState } from "./auth.types"
import { userReducers } from "./auth.reducer"
import { RootState } from "../redux.store"




const initialState: AuthState = {
    user: {},
    isLoggedIn: false
}

export const sliceName = "auth"

export const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: userReducers
})

export const { resetUser, setUser } = authSlice.actions

export const selectUser = (state: RootState) => state[sliceName].user
export type userType = ReturnType<typeof selectUser>
export const selectLoggedIn = (state: RootState) => state[sliceName].isLoggedIn

export default authSlice.reducer

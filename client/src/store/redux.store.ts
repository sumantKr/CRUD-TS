import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import { authApi } from "../services/auth/auth";
import postSliceReducer, { sliceName as postSliceKey } from "./post/counter.slice";
import authSliceReducer, { sliceName as authSliceKey } from "./auth/auth.slice";
import persistReducer from "redux-persist/es/persistReducer";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storageSession from "redux-persist/lib/storage/session"
import { useDispatch } from "react-redux";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
    [postSliceKey]: postSliceReducer,
    [authSliceKey]: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
})

const persistedReducer = persistReducer<RootReducer>({
    key: 'root',
    storage: storageSession,
    stateReconciler: autoMergeLevel2,
    // whitelist: []
}, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(
        authApi.middleware
    )
})
export const persistedStore = persistStore(store);
export type RootReducer = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch


import { Action, Middleware, MiddlewareAPI, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
// import { toast } from 'react-hot-toast';

/**
 * show a toast on error!
 */
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        const { error } = action.payload.data
        toast.error(error?.message ?? `Unknown Error occurred`)
    }

    return next(action)
}
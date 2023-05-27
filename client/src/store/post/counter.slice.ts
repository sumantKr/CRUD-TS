import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux.store'
import { allReducers } from './counter.reducer'
import { CounterState } from './counter.type'

// Define a type for the slice state

// Define the initial state using that type
const initialState: CounterState = {
    value: 0
}
export const sliceName = "counter"
export const postSlice = createSlice({
    name: sliceName,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: allReducers
})

export const { increment, decrement, incrementByAmount,decrementByAmount } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState):number => state[sliceName].value

export default postSlice.reducer
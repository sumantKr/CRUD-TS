import { Action, PayloadAction } from "@reduxjs/toolkit"
import { CounterState } from "./counter.type"


const incrementByAmount = (state: CounterState, action: PayloadAction<number>): CounterState => {
    const amount = action.payload
    const newValue = state.value + amount;
    return { ...state, value: newValue }
}
const decrementByAmount = (state: CounterState, action: PayloadAction<number>): CounterState => {
    const amount = action.payload
    const newValue = state.value - amount;
    return { ...state, value: newValue }
}

const increment = (state: CounterState): CounterState => {
    const newValue = state.value + 1;
    return { ...state, value: newValue }
}
const decrement = (state: CounterState): CounterState => {
    const newValue = state.value - 1;
    return { ...state, value: newValue }
}

export const allReducers = {
    increment,
    decrement,
    decrementByAmount,
    incrementByAmount,
}
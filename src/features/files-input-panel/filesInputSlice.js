import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    rawHtml: "",
}

export const filesInputSlice = createSlice({
    name: 'filesInput',
    initialState,
    reducers: {
        setRawHtml: (state, action) => {
            state.rawHtml = action.payload
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const {setRawHtml} = filesInputSlice.actions

export default filesInputSlice.reducer
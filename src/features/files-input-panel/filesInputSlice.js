import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentLang: "EN",
    rawHtml: "",
    textBlocks: [],
    translatedTextBlocks: [],
    translatesTable: [],
    availableLangs: {
        "EN": 0
    },
}

export const filesInputSlice = createSlice({
    name: 'filesInput',
    initialState,
    reducers: {
        setRawHtml: (state, action) => {
            state.rawHtml = action.payload
        },
        setTranslatesTable: (state, action) => {
            state.translatesTable = action.payload
        },
        setAvailableLangs: (state, action) => {
            state.availableLangs = action.payload
        },
        setCurrentLang: (state, action) => {
            state.currentLang = action.payload
        },
        addTextBlock: (state, action) => {
            state.textBlocks.push(action.payload)
        },
        clearTextBlocks: (state) => {
            state.textBlocks = []
        },
        setTranslatedTextBlocks: (state, action) => {
            state.translatedTextBlocks = action.payload
        }
    },
})

export const {
    setRawHtml,
    setTranslatesTable,
    setAvailableLangs,
    setCurrentLang,
    addTextBlock,
    clearTextBlocks,
    setTranslatedTextBlocks
} = filesInputSlice.actions

export default filesInputSlice.reducer
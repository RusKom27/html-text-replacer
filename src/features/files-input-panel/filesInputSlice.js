import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentLang: "EN",
    originalLang: "EN",
    isTranslatedIndexes: [],
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
        setOriginalLang: (state, action) => {
            state.originalLang = action.payload
        },
        addTextBlock: (state, action) => {
            state.textBlocks.push(action.payload)
        },
        clearTextBlocks: (state) => {
            state.textBlocks = []
        },
        setTranslatedTextBlocks: (state, action) => {
            state.translatedTextBlocks = action.payload
        },
        setIsTranslatedIndexes: (state, action) => {
            state.isTranslatedIndexes = action.payload
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
    setTranslatedTextBlocks,
    setOriginalLang,
    setIsTranslatedIndexes
} = filesInputSlice.actions

export default filesInputSlice.reducer
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentLang: "EN",
    originalLang: "EN",
    isTranslatedIndexes: [],
    rawHtml: "",
    reformattedHtml: "",
    textBlocks: [],
    translatedTextBlocks: [],
    translatesTable: [],
    sortedTranslatesTable: [],
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
        setReformattedHtml: (state, action) => {
            state.reformattedHtml = action.payload
        },
        setTranslatesTable: (state, action) => {
            state.translatesTable = action.payload
        },
        setSortedTranslatesTable: (state, action) => {
            state.sortedTranslatesTable = action.payload
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
        addTextBlocks: (state, action) => {
            state.textBlocks = action.payload
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
    addTextBlocks,
    clearTextBlocks,
    setTranslatedTextBlocks,
    setOriginalLang,
    setIsTranslatedIndexes,
    setSortedTranslatesTable,
    setReformattedHtml
} = filesInputSlice.actions

export default filesInputSlice.reducer
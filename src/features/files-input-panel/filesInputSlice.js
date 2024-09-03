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
    htmlFiles: localStorage.getItem('htmlFiles') ? JSON.parse(localStorage.getItem('htmlFiles')) : {},
    translatesFiles: localStorage.getItem('translatesFiles') ? JSON.parse(localStorage.getItem('translatesFiles')) : {}
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
        },
        addHtmlFile: (state, action) => {
            state.htmlFiles = {...state.htmlFiles, ...action.payload}
            localStorage.setItem('htmlFiles', JSON.stringify(state.htmlFiles))
        },
        addTranslatesFile: (state, action) => {
            state.translatesFiles = {...state.translatesFiles, ...action.payload}
            localStorage.setItem('translatesFiles', JSON.stringify(state.translatesFiles))
        },
        removeHtmlFile: (state, action) => {
            delete state.htmlFiles[action.payload]
            localStorage.setItem('htmlFiles', JSON.stringify(state.htmlFiles))
        },
        removeTranslatesFile: (state, action) => {
            delete state.translatesFiles[action.payload]
            localStorage.setItem('translatesFiles', JSON.stringify(state.translatesFiles))
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
    setReformattedHtml,
    addHtmlFile,
    addTranslatesFile,
    removeHtmlFile,
    removeTranslatesFile,
} = filesInputSlice.actions

export default filesInputSlice.reducer
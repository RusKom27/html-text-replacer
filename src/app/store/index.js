import {configureStore} from '@reduxjs/toolkit'

import filesInputSlice from '../../features/files-input-panel/filesInputSlice'


export const store = configureStore({
    reducer: {
        filesInput: filesInputSlice
    }
})
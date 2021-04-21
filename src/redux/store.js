import { configureStore } from '@reduxjs/toolkit'

import listReducer from './listSlice'
import defReducer from './defSlice'
import extraReducer from './extraSlice'

export default configureStore({
  reducer: {
    listId: listReducer,
    definitionArray: defReducer,
    extraInfo: extraReducer
  },
})
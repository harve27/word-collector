import { createSlice } from '@reduxjs/toolkit'

export const extraSlice = createSlice({
  name: 'extraInfo',
  initialState: {
    whereWord: "",
    description: ""
  },
  reducers: {
    setDescription: (state, { payload }) => {
      state.description = payload
    },
    setWhereWord: (state, { payload }) => {
      state.whereWord = payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDescription, setWhereWord } = extraSlice.actions

export default extraSlice.reducer
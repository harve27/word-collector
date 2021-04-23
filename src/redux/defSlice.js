import { createSlice } from '@reduxjs/toolkit'

export const defSlice = createSlice({
  name: 'definitionArray',
  initialState: {
    value: [],
    isSpelled: true
  },
  reducers: {
    setDefinitionArray: (state, { payload }) => {
      state.value = payload
    },
    setSpellStatus: (state, { payload }) => {
      state.isSpelled = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDefinitionArray, setSpellStatus } = defSlice.actions

export default defSlice.reducer
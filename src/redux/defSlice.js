import { createSlice } from '@reduxjs/toolkit'

export const defSlice = createSlice({
  name: 'definitionArray',
  initialState: {
    value: [],
  },
  reducers: {
    setDefinitionArray: (state, { payload }) => {
      state.value = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDefinitionArray } = defSlice.actions

export default defSlice.reducer
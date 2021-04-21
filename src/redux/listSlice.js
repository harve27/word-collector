import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
  name: 'listId',
  initialState: {
    value: "List",
    name: "Main List"
  },
  reducers: {
    setWordListId: (state, { payload }) => {
      state.value = payload
    },
    setWordListName: (state, { payload }) => {
      state.name = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWordListId, setWordListName } = listSlice.actions

export default listSlice.reducer
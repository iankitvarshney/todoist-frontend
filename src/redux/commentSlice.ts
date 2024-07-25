import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    projectComments: {},
    taskComments: {},
  },
  reducers: {
    setTaskComments: (state: any, action) => {
      state.taskComments[action.payload.id] = action.payload.data;
    },
  },
});

export default commentSlice.reducer;
export const { setTaskComments } = commentSlice.actions;

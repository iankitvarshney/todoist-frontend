import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    projectTasks: [],
    sectionTasks: {},
  },
  reducers: {
    setProjectTasks: (state: any, action) => {
      state.projectTasks = action.payload;
    },
    setSectionTasks: (state: any, action) => {
      state.sectionTasks[action.payload.id] = action.payload.data;
    },
  },
});

export default taskSlice.reducer;
export const { setProjectTasks, setSectionTasks } = taskSlice.actions;

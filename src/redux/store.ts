import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import sectionSlice from "./sectionSlice";
import taskSlice from "./taskSlice";
import commentSlice from "./commentSlice";

const store = configureStore({
  reducer: {
    project: projectSlice,
    section: sectionSlice,
    task: taskSlice,
    comment: commentSlice,
  },
});

export default store;

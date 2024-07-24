import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import sectionSlice from "./sectionSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    project: projectSlice,
    section: sectionSlice,
    task: taskSlice,
  },
});

export default store;

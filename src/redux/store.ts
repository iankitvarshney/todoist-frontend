import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import taskSlice from "./taskSlice";

const store = configureStore({
  reducer: {
    project: projectSlice,
    task: taskSlice,
  },
});

export default store;

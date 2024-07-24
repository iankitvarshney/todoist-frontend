import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";

const store = configureStore({
  reducer: {
    project: projectSlice,
  },
});

export default store;

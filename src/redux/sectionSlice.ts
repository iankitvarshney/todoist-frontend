import { createSlice } from "@reduxjs/toolkit";

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    sections: {},
  },
  reducers: {
    setSections: (state: any, action) => {
      state.sections[action.payload.id] = action.payload.data;
    },
  },
});

export default sectionSlice.reducer;
export const { setSections } = sectionSlice.actions;

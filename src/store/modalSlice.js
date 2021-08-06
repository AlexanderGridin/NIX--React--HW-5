import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isActive: false,
  },
  reducers: {
    setModalIsActive(state, action) {
      state.isActive = action.payload.isActive;
    },
  },
});

export const { setModalIsActive } = modalSlice.actions;
export default modalSlice.reducer;

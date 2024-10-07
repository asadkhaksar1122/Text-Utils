import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  text: "",
  mode: localStorage.getItem("mode") || "light",
};

let textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    changetext: (state, action) => {
      state.text = action.payload;
    },
    changemode: (state) => {
      if (state.mode == "light") {
        state.mode = "dark";
        localStorage.setItem("mode", "dark");
      } else {
        state.mode = "light";
        localStorage.setItem("mode", "light");
      }
    },
  },
});
export const { changetext, changemode } = textSlice.actions;
export default textSlice.reducer;

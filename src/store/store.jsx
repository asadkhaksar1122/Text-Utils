import { configureStore } from "@reduxjs/toolkit";
import textreducer from "../features/textslice";

let Store = configureStore({
  reducer: {
    text: textreducer,
  },
});
export default Store;

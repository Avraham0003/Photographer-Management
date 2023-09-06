import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import imagesSlice from "./slices/imagesSlices";

const myStore = configureStore({
  reducer: {
    imagesSlice
  },
});
function StoreProvider({ children }) {
  return <Provider store={myStore}>{children}</Provider>;
}

export default StoreProvider;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/UserContext";
import StoreProvider from "./redux/store.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <UserProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
      <ToastContainer autoClose={500} />
    </UserProvider>
  </ChakraProvider>
);

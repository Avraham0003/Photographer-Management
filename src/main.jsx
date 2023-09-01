import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImagesContextProvider from "./context/ImagesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <UserProvider>
      <ImagesContextProvider>
        <App />
        <ToastContainer />
      </ImagesContextProvider>
    </UserProvider>
  </ChakraProvider>
);

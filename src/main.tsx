import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { queryClient } from "./services/query-client";
import { AuthProvider } from "./context/Auth";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import StripeModalProvider from "./context/StripeModal";
import ConciergContextProvider from "./context/Concierg";
import PageContextProvider from "./context/PageNaming";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <PageContextProvider>
        <ConciergContextProvider>
          <StripeModalProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AuthProvider>
                <App />
              </AuthProvider>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                closeButton={false}
              />
            </LocalizationProvider>
          </StripeModalProvider>
        </ConciergContextProvider>
      </PageContextProvider>
    </QueryClientProvider>
  </>
);

"use client"
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

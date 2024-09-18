import { Providers } from "@/store/providers";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Prosbro",
  description: "billing software for construction and renovation contractors in canada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

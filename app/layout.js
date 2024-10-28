import { Providers } from "@/store/providers";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ProgressBarProvider from "@/components/progress-bar";

export const metadata = {
  title: "Prosbro",
  description: "billing software for construction and renovation contractors in canada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <ProgressBarProvider>
          <Providers>
            {children}
          </Providers>
        </ProgressBarProvider>
      </body>
    </html>
  );
}

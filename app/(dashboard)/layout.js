"use client"
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import theme from "@/theme";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

const MainLayout = ({ children }) => {

  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Topbar />
            <div className="p-6 min-h-screen">{children}</div>
          </div>
        </div>
      </ThemeProvider>
    </Suspense>
  );
};

export default MainLayout;

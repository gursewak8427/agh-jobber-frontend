"use client"
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Suspense, useEffect } from "react";
import { Loading } from "../_components/loading";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { clearerrorList, clearsuccessList, fetchBusniessProfile } from "@/store/slices/client";
import theme from "@/theme";

const MainLayout = ({ children }) => {
  const { successList, errorList, darkMode } = useSelector(state => state.clients);
  const dispatch = useDispatch();
  useEffect(() => {
    if (successList) {
      toast.success(successList, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearsuccessList())
    }
    if (errorList) {
      toast.error(errorList, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      dispatch(clearerrorList())
    }
  }, [successList, errorList])
  useEffect(() => {
    dispatch(fetchBusniessProfile());
  }, [])
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log('adding dark');
      
    } else {
      document.documentElement.classList.remove('dark');
      console.log('removing dark');
    }
  }, [darkMode]);
  return (
    <Suspense>
      <ThemeProvider theme={theme(darkMode ? 'dark' : 'light')}>
        <CssBaseline />
        <div className="flex dark:bg-dark-secondary">
          <Sidebar />
          <div className="flex-1">
            <Topbar />
            <div className="p-6 min-h-screen relative dark:text-dark-text ">{children}<Loading /></div>
          </div>
        </div>
      </ThemeProvider>
    </Suspense>
  );
};

export default MainLayout;

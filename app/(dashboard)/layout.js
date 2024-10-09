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
import { clearerrorList, clearsuccessList, darkmodeState, fetchBusniessProfile } from "@/store/slices/client";
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
    if(JSON.parse(localStorage.getItem('mode'))){
      dispatch(darkmodeState(JSON.parse(localStorage.getItem('mode'))))
    }
  }, [])
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      
    } else {
      document.documentElement.classList.remove('dark');
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

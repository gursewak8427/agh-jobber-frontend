"use client"
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Suspense, useEffect } from "react";
import { Loading } from "../_components/loading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { clearerrorList, clearsuccessList, darkmodeState, fetchBusniessProfile, clearloadingpromise } from "@/store/slices/client";
import theme from "@/theme";

const MainLayout = ({ children }) => {
  const { successList, errorList, darkMode, loadingpromise } = useSelector(state => state.clients);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadingpromise) {
      toast.dismiss();
      toast.loading(loadingpromise, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearloadingpromise())
    }
    if (successList) {
      toast.dismiss();
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
      toast.dismiss();
      toast.error(errorList, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearerrorList())
    }
  }, [successList, errorList, loadingpromise])
  useEffect(() => {
    dispatch(fetchBusniessProfile());
    if (JSON.parse(localStorage.getItem('mode'))) {
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
            <div className="z-40 p-6 min-h-screen relative dark:text-dark-text ">{children}<Loading /></div>
          </div>
        </div>
      </ThemeProvider>
    </Suspense>
  );
};

export default MainLayout;

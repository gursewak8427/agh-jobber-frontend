"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Suspense, useEffect } from "react";
import { Loading } from "../_components/loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearerrorList,
  clearsuccessList,
  darkmodeState,
  fetchBusniessProfile,
  clearloadingpromise,
} from "@/store/slices/client";
import theme from "@/theme";
// import { LoadScript } from "@react-google-maps/api";
import { ServerLoading } from "@/components/LoadingPage";

const MainLayout = ({ children }) => {
  const { successList, errorList, darkMode, loadingpromise } = useSelector(
    (state) => state.clients
  );
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
      dispatch(clearloadingpromise());
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
      dispatch(clearsuccessList());
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
      dispatch(clearerrorList());
    }
  }, [successList, errorList, loadingpromise]);
  useEffect(() => {
    dispatch(fetchBusniessProfile());
    if (JSON.parse(localStorage.getItem("mode"))) {
      dispatch(darkmodeState(JSON.parse(localStorage.getItem("mode"))));
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <Suspense fallback={<ServerLoading />}>
      <ThemeProvider theme={theme(darkMode ? "dark" : "light")}>
        {/* <LoadScript googleMapsApiKey="AIzaSyC4xDqx5yDdrRzTGbAakYuRBjjf0wxpvYs" libraries={['places']}> */}
        <CssBaseline />
        <div className="bg-white flex dark:bg-dark-secondary z-[999]">
          <Sidebar />
          <div className="flex-1 z-[997]">
            <Topbar />
            <div className="p-6 min-h-screen relative dark:text-dark-text ">
              {children}
              <Loading />
            </div>
          </div>
        </div>
        {/* </LoadScript> */}
      </ThemeProvider>
    </Suspense>
  );
};

export default MainLayout;

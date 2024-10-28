"use client";
import React, { createContext } from "react";
import { useProgress } from "@/hooks/use-progress";

export const ProgressBarContext = createContext(null);

const ProgressBarProvider = ({ children }) => {
  const progress = useProgress();

  return (
    <ProgressBarContext.Provider value={progress}>
      {progress.state !== "initial" && (
        <div
          className="fixed top-0 z-[1000000] inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-blue-300 duration-300 transition-all ease-in-out"
          style={{ width: `${progress.value}%` }}
        />
      )}
      {children}
    </ProgressBarContext.Provider>
  );
};
export default ProgressBarProvider;

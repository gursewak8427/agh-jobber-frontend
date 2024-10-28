'use client'
import { useContext } from "react";
import { ProgressBarContext } from "@/components/progress-bar";

export const useProgressBar = () => {
  const progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error(
      "useProgressBar must be used within the ProgressBarProvider"
    );
  }

  return progress;
};
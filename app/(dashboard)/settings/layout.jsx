"use client";
import SettingsSidebar from "@/components/SettingsSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="w-full p-2">{children}</div>
    </div>
  );
};

export default layout;

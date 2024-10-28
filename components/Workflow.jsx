import {
  ClipboardList,
  FileText,
  Briefcase,
  DollarSign,
  GitPullRequestIcon,
} from "lucide-react";
import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";

const cards = [
  {
    title: "Requests",
    title2: "New",
    icon: <GitPullRequestIcon className="text-yellow-700" />,
    count: 0,
    bottom1: { title: "Assessments complete", count: 0 },
    bottom2: { title: "Overdue", count: 0 },
    color: "border-yellow-700",
  },
  {
    title: "Quotes",
    title2: "Approved",
    icon: <FileText className="text-red-700" />,
    count: 0,
    bottom1: { title: "Draft", count: 0 },
    bottom2: { title: "Changes requested", count: 0 },
    color: "border-red-700",
  },
  {
    title: "Jobs",
    title2: "Require invoicing",
    icon: <Briefcase className="text-green-700" />,
    count: 0,
    bottom1: { title: "Active", count: 0 },
    bottom2: { title: "Action required", count: 0 },
    color: "border-green-700",
  },
  {
    title: "Invoices",
    title2: "Await Payment",
    icon: <DollarSign className="text-blue-700" />,
    count: 0,
    bottom1: { title: "Draft", count: 0 },
    bottom2: { title: "Past due", count: 0 },
    color: "border-blue-700",
  },
];

const DashboardBoxLoading = ({ card }) => {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 dark:text-dark-text dark:hover:bg-dark-hover cursor-pointer rounded-lg">
        <div className="flex gap-3 items-center mb-3">
          {card.icon}
          <span className="text-sm text-gray-500 dark:text-dark-text">
            {card.title}
          </span>
        </div>
        <div className={`w-[15%] h-[40px] animate-pulse bg-gray-200`}></div>
        <div className={`w-[20%] h-[21px] animate-pulse bg-gray-200`}></div>
        <div className={`w-[70%] h-[21px] animate-pulse bg-gray-200`}></div>
        <div className={`w-[50%] h-[21px] animate-pulse bg-gray-200`}></div>
      </div>
    </>
  );
};

const Workflow = ({ loading }) => {
  return (
    <div className="flex flex-col gap-3 dark:text-dark-text dark:bg-dark-secondary">
      <Heading title="Workflow" />
      <div className="flex justify-between items-center dark:bg-dark-secondary dark:text-dark-text ">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`dark:bg-dark-secondary dark:text-dark-text  flex flex-col  w-[24.9%] bg-gray-100 border-t-4 ${
              index == 0
                ? "rounded-l"
                : index == cards?.length - 1
                ? "rounded-r"
                : ""
            } ${card?.color} text-tprimary p-4`}
          >
            {loading ? (
              <DashboardBoxLoading card={card} />
            ) : (
              <>
                <div className="flex flex-col gap-1 p-2 hover:bg-primary-dark dark:text-dark-text dark:hover:bg-dark-hover cursor-pointer rounded-lg">
                  <div className="flex gap-3 items-center mb-3">
                    {card.icon}
                    <span className="text-sm text-gray-500 dark:text-dark-text">
                      {card.title}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black">{card.count}</h3>
                  <span className="text-md font-semibold">{card.title2}</span>
                </div>
                <div className="px-2 py-[3px] gap-1 hover:bg-primary-dark dark:hover:bg-dark-hover cursor-pointer rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-dark-text">
                    {card.bottom1.title} ({card.bottom1.count})
                  </span>
                </div>
                <div className="px-2 py-[3px] gap-1 hover:bg-primary-dark  dark:hover:bg-dark-hover cursor-pointer rounded-lg">
                  <span className="text-sm text-gray-500 dark:text-dark-text">
                    {card.bottom2.title} ({card.bottom2.count})
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workflow;

import React from "react";
import { useLocation, Routes, Route } from "react-router-dom";

// components
import { GoBackButton, Tabs } from "components";


import { EmployeeSchedule } from "./EmployeeSchedule";
import { CreateTask } from "./CreateTask";

export const EmployeeScheduleTabs = () => {
  let { pathname } = useLocation();

  const tabs = [
    {
      tab: "Employees",
      url: "/my-tasks/add-a-schedule/employee-schedule",
    },
    {
      tab: "Create Tasks",
      url: "/my-tasks/add-a-schedule/create-task",
    },
  ];
  return (
    <div>
      <GoBackButton link={"my-tasks/add-a-schedule"}>
        Back To Selection
      </GoBackButton>
      {/* Links */}

      {/* Others */}
      <div className="w-full mt-8">
        <Tabs tabs={tabs} />

        <Routes>
          <Route path={"employee-schedule"} element={<EmployeeSchedule />} />
          <Route path={"create-task"} element={<CreateTask />} />
        </Routes>
      </div>
    </div>
  );
};

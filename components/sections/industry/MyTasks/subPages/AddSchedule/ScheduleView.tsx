import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const EmployeeDataContext = createContext(null);

export const ScheduleView = () => {
  const [employeeData, setEmployeeData] = useState(null);

  const store = {
    employeeData,
    setEmployeeData,
  };
  return (
    <EmployeeDataContext.Provider value={store}>
      <Outlet />
    </EmployeeDataContext.Provider>
  );
};

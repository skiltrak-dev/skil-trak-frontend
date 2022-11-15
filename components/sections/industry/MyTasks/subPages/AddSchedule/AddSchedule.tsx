import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Button, GoBackButton, Card, Typography } from "components";
import { RightSidebarData } from "./components";

// Context
import { useContextBar } from "hooks";

export const AddSchedule = () => {
  const { setContent } = useContextBar();
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    );
  }, [setContent]);

  // const origin = window.location.origin;
  const continieWith = [
    {
      image: "/images/Employee.png",
      text: "Employee Schedule",
    },
    {
      image: "/images/student.png",
      text: "Student Scheduled",
    },
  ];
  return (
    <div>
      <GoBackButton link={"/"}>Back To Dashboard</GoBackButton>

      <Card mt={6}>
        <Typography variant={"subtitle"}>Continue with</Typography>

        <div className="flex  gap-x-16 px-6 py-11">
          {continieWith.map(({ image, text }, index) => (
            <Fragment key={index}>
              <div
                className={`border p-2 flex flex-col items-center cursor-pointer rounded-lg ${
                  selectedSchedule === text
                    ? "border-primary"
                    : "border-secondary-dark"
                }`}
                onClick={() => setSelectedSchedule(text)}
              >
                <img
                  src={`${image}`}
                  alt="Employee"
                />
                <Typography variant={"subtitle"}>{text}</Typography>
              </div>
              {index !== continieWith.length - 1 && (
                <div className="border-r"></div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Action */}
        <Button
          disabled={selectedSchedule !== "Employee Schedule"}
          border={"2"}
          borderColor={"primary"}
          bgColor={"primary"}
          onClick={() => navigate("/my-tasks/add-a-schedule/employee-schedule")}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
};

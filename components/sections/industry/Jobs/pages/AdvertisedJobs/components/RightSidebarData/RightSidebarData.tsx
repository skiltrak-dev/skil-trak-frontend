import React from "react";
import { useNavigate } from "react-router-dom";

// componemts
import { Button, OtherDocumentLinks } from "components";

export const RightSidebarData = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col">
        <Button
          variant={"dark"}
          onClick={() => navigate("/jobs/advertise-new-job")}
        >
          Advertise New Job
        </Button>
      </div>
      <OtherDocumentLinks />
    </>
  );
};

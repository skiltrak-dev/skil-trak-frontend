import React from "react";
import { useNavigate } from "react-router-dom";

// componemts
import {
  Button,
  OtherDocumentLinks,
  PrimaryActionLink,
  Typography,
} from "components";

export const RightSidebarData = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start gap-y-4">
      <img
        className="w-full h-[180px] object-cover rounded-lg"
        src="https://picsum.photos/800/800"
        alt="Sidebar"
      />
      <Button onClick={() => navigate("/apply-for-rpl")}>Apply For RPL</Button>

      <div className="flex flex-col gap-y-2 mt-2">
        <Typography varient={"text"} color={"gray"}>
          Related Links
        </Typography>

        <PrimaryActionLink
          border={"1"}
          link={"general-information/placement-workflow"}
          bgColor={"white"}
          bgHoverColor={"secondary"}
          borderColor={"secondary"}
          shadow={1}
          title={"Placement Workflow"}
          desc={"Some helping text"}
          img={"./images/dashboardbtn6.png"}
        />
        <PrimaryActionLink
          border={"1"}
          link={"general-information/industry-consultation"}
          bgColor={"white"}
          bgHoverColor={"secondary"}
          borderColor={"secondary"}
          shadow={1}
          title={"Industry Consultation"}
          desc={"Some helping text"}
          img={"./images/dashboardbtn7.png"}
        />
        <PrimaryActionLink
          border={"1"}
          link={"general-information/mou"}
          bgColor={"white"}
          bgHoverColor={"secondary"}
          borderColor={"secondary"}
          shadow={1}
          title={"MoU"}
          desc={"Memorandum Of Understanding"}
          img={"./images/dashboardbtn8.png"}
        />
      </div>

      {/* Other Links */}
      <div className="w-full flex flex-col gap-y-2 mt-2">
        <Typography varient={"text"} color={"gray"}>
          Other Links
        </Typography>

        <OtherDocumentLinks />
      </div>
    </div>
  );
};

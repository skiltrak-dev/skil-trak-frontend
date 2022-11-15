import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import {
  Button,
  GoBackButton,
  Card,
  DocumentView,
  Typography,
} from "../../../../components";
import { RightSidebarData } from "./components";
// import {RelatedLinkPageData} from '../../components'

// Context
import { useContextBar } from "hooks";

export const IndustryConsultation = () => {
  const navigate = useNavigate();
  const { setContent } = useContextBar();
  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    );
  }, [setContent]);
  return (
    <div>
      <GoBackButton>Back To Dashboard</GoBackButton>

      {/* Data */}
      <DocumentView
        title={"Industry Consultation"}
        downloadLink={"http://www.africau.edu/images/default/sample.pdf"}
      >
        <Typography variant={"title"}>Section 1</Typography>
        <div className="flex flex-col gap-y-3 my-2.5">
          <Typography>
            Lorem ipsum dolor sit amet. Quo dolore repellat qui culpa voluptates
            est dolor perspiciatis qui voluptatem placeat. Eos fugiat internos
            aut autem vero sed placeat odit aut eaque porro qui explicabo
            voluptas 33 odit asperiores.
          </Typography>
          <Typography>
            Vel commodi repellat et repellat error ut minima tenetur id magnam
            iure 33 nisi quisquam At error cumque. Et sequi eligendi sed
            corrupti perferendis in consequatur expedita et enim galisum non
            reiciendis repudiandae qui fugiat dolorum.
          </Typography>
          <Typography>
            Quo dolorum eius quisquam debitis sit quisquam doloremque! Est earum
            voluptas nam vero sequi sed maiores esse et quidem dicta sed eveniet
            animi.
          </Typography>
        </div>
      </DocumentView>

      <Card mt={6}>
        <Typography variant={"subtitle"}>
          Want to become a consultant?
        </Typography>

        <div className="flex items-center gap-x-4 mt-4">
          <Button
            border={"2"}
            borderColor={"primary"}
            bgColor={"primary"}
            onClick={() => navigate("/general-information/consultation")}
          >
            Yes
          </Button>
          <Button border={"2"} borderColor={"primary"} bgColor={"text"}>
            Confirm Upon Request
          </Button>
          <Button
            border={"2"}
            borderColor={"primary"}
            bgColor={"secondary"}
            textColor={"text"}
          >
            No
          </Button>
        </div>
      </Card>
    </div>
  );
};

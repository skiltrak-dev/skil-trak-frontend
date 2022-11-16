import React, { useEffect, useState } from "react";

// Icons
import { BsFillCheckCircleFill } from "react-icons/bs";

// components
import {
  ActionAlert,
  Button,
  GoBackButton,
  Card,
  DocumentView,
  Typography,
} from "../../../../components";
import { RightSidebarData } from "./components";

// Context
import { useContextBar } from "hooks";
import { useNavigate } from "react-router-dom";

export const RequestAVolunteerStudent = () => {
  const { setContent } = useContextBar();
  const [isVolunteer, setIsVolunteer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    );
  }, [setContent]);

  useEffect(() => {
    isVolunteer &&
      setTimeout(() => {
        navigate("/students");
      }, 2000);
  }, [isVolunteer, navigate]);

  const onVolunteer = () => {
    setIsVolunteer(true);
  };

  return isVolunteer ? (
    <Card>
      <ActionAlert
        Icon={BsFillCheckCircleFill}
        title={"Successfully requested a volunteer student"}
        description={"You will be redirected to jobs in a moment."}
        iconsColor={"success"}
      />
    </Card>
  ) : (
    <>
      <GoBackButton>Back To Dashboard</GoBackButton>

      {/* Data */}
      <DocumentView title={"Request A Volunteer Student"}>
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

          <div className="w-full mt-6 flex gap-x-2">
            <Button
              border={"2"}
              borderColor={"primary"}
              bgColor={"primary"}
              onClick={onVolunteer}
            >
              Yes
            </Button>
            <Button
              border={"2"}
              borderColor={"primary"}
              bgColor={"secondary"}
              textColor={"text"}
              onClick={() => navigate("/students")}
            >
              No
            </Button>
          </div>
        </div>
      </DocumentView>
    </>
  );
};

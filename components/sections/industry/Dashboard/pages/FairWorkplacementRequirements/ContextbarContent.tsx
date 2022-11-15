import React from "react";
import { useLocation } from "react-router-dom";

// components
import {
  Typography,
  OtherDocumentLinks,
  DisplayPrimaryActions,
} from "components";
import { PrimaryActions as DashboardPrimaryActions } from "../Dashboard";
import { AdForRPL } from "../../../ApplyForRPL/AdForRPL";

export const ContextBarContent = () => {
  const location = useLocation();

  return (
    <>
      <AdForRPL short />

      <Typography variant="muted" color="gray">
        Related Links
      </Typography>

      <OtherDocumentLinks hideLink={location.pathname.replace("/", "")} />

      <Typography variant="muted" color="gray">
        Other Links
      </Typography>

      <DisplayPrimaryActions actions={DashboardPrimaryActions} />
    </>
  );
};

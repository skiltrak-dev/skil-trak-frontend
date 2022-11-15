import React, { useEffect } from "react";

// components
import { Card, GoBackButton, ReactTable } from "components";
import { RightSidebarData } from "../../components";

// hooks
import { useContextBar } from "hooks";
import { useGetStudentsQuery } from "redux/query";

export const Appointments = () => {
  const { setContent } = useContextBar();

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    );
  }, [setContent]);
  //
  const Columns = [
    {
      Header: "Placement Coordinator",
      accessor: "PlacementCoordinator",
    },
    {
      Header: "Type",
      accessor: "Type",
      disableFilters: true,
    },
    {
      Header: "Date",
      accessor: "Date",
    },
    {
      Header: "Time",
      accessor: "Time",
    },
  ];
  return (
    <div>
      <GoBackButton>Back To Students</GoBackButton>

      <Card mt={6}>
        <ReactTable
          Columns={Columns}
          tableTitle={"Your Appointments"}
          isPagination
          defaultTableRows={4}
          borderBottom={1}
          action={useGetStudentsQuery}
        />
      </Card>
    </div>
  );
};

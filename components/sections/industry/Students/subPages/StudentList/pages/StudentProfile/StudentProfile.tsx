import React from "react";
import { useParams } from "react-router-dom";

// components
import { Card, GoBackButton } from "components";

// query
import { useGetIndustryStudentProfileQuery } from "redux/query";
import { Loading } from "components";
import { EmptyData } from "components";
import { StudentProfileData } from "./components";

export const StudentProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetIndustryStudentProfileQuery(id);

  return (
    <div>
      <GoBackButton>Back To Students</GoBackButton>
      <Card mt={6}>
        {!isLoading ? (
          data ? (
            <StudentProfileData data={data} />
          ) : (
            <EmptyData actionLink={null} />
          )
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
};

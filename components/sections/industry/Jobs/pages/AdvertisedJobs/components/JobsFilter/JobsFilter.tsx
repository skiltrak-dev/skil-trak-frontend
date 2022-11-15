import React from "react";
import { Form, Formik } from "formik";

// components
import { InputField, SelectFieldOption } from "components";
export const JobsFilter = ({ onFilterChange, filter }) => {
  const initialValues = {
    ...filter,
  };

  const StatusOptions = [
    { label: "Pending", value: "pending" }
  ];

  const JobTypeOptions = [
    { value: "fullTime", label: "Full Time" },
    { value: "partTime", label: "Part Time" },
    { value: "temporary-and-casual", label: "Temporary & Casual" },
  ];

  return (
    <Formik initialValues={initialValues}>
      {(props) => {
        const { touched, errors } = props;
        return (
          <Form>
            <div className="flex items-start gap-x-5 py-2">
              <InputField
                label={"Title"}
                name={"title"}
                placeholder={"Search By Job Title"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, title: e.target.value });
                }}
              />
              <SelectFieldOption
                label={"Type"}
                name={"type"}
                onChange={(e) => {
                  onFilterChange({ ...filter, type: e.value });
                }}
                options={JobTypeOptions}
              />
              {/* <SelectFieldOption
                label={"Status"}
                name={"status"}
                onChange={(e) => {
                  onFilterChange({ ...filter, status: e.value });
                }}
                options={StatusOptions}
              /> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

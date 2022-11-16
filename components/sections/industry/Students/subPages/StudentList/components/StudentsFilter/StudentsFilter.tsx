import React from "react";
import { Form, Formik } from "formik";

// components
import { InputField } from "components";

export const StudentsFilter = ({ onFilterChange, filter }) => {
  const initialValues = {
    ...filter,
  };

  return (
    <Formik initialValues={initialValues}>
      {(props) => {
        const { touched, errors } = props;
        return (
          <Form>
            <div className="flex items-start gap-x-5 py-2">
              <InputField
                label={"Name"}
                name={"name"}
                placeholder={"Search By Student Name"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, title: e.target.value });
                }}
              />
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"Search By Student Email"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, email: e.target.value });
                }}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

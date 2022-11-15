import React from "react";
import { Form, Formik } from "formik";

// components
import { InputField, SelectFieldOption } from "components";

export const RTOFilter = ({ onFilterChange, filter }) => {
  const initialValues = {
    name: "",
    rtoCode: "",
    email: "",
    status: "",
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
                placeholder={"Search By RTO Name"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, name: e.target.value });
                }}
              />
              <InputField
                label={"Email"}
                name={"email"}
                type={"email"}
                placeholder={"Search By RTO Email"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, email: e.target.value });
                }}
              />
              <InputField
                label={"Code"}
                name={"rtoCode"}
                placeholder={"Search By RTO Code"}
                touched={touched}
                errors={errors}
                onChange={(e) => {
                  onFilterChange({ ...filter, rtoCode: e.target.value });
                }}
              />
              <SelectFieldOption
                label={"Status"}
                name={"status"}
                onChange={(e) => {
                  onFilterChange({ ...filter, status: e.value });
                }}
                options={[
                  {
                    label: "Initiated",
                    value: "initiated",
                  },
                  {
                    label: "Requested",
                    value: "requested",
                  },
                  {
                    label: "Signed",
                    value: "signed",
                  },
                  {
                    label: "Cancelled",
                    value: "cancelled",
                  },
                  {
                    label: "Not Initiated",
                    value: "not-nitiated",
                  },
                ]}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

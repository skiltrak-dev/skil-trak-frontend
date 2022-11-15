import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

// Components
import { Button, InputField } from "components";

// Contexts
import { useContextBar } from "hooks";

// functions
import { Console } from "utills/functions/ShowConsole";

export const ContactUs = () => {
  const { setContent } = useContextBar();

  const initialValues = {
    input: "",
    input1: "",
    input2: "",
  };

  const validationSchema = yup.object({
    input: yup.string().required("Some error occured!"),
    input1: yup.string().required("Some error occured!"),
    input2: yup.string().required("Some error occured!"),
  });

  const onSubmit = (values) => {
    Console("values", values);
  };
  useEffect(() => {
    setContent(
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ touched, errors }) => {
            return (
              <Form className="pr-4">
                <div className="flex flex-col gap-y-5">
                  <InputField
                    label={"Label"}
                    name={"input"}
                    placeholder={"Some Text Here..."}
                    touched={touched}
                    errors={errors}
                  />
                  <InputField
                    label={"Label"}
                    name={"input1"}
                    placeholder={"Some Text Here..."}
                    isNotified
                    notificationText={
                      "Some kind info that should explain why this input is necessary or required."
                    }
                    touched={touched}
                    errors={errors}
                  />
                  <InputField
                    label={"Label"}
                    name={"input2"}
                    placeholder={"Some Text Here..."}
                    errorIcons
                    touched={touched}
                    errors={errors}
                  />
                </div>
                <br />
                <Button submit>Submit</Button>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }, [setContent]);
  return <div>ContactUs</div>;
};

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Form, Formik } from 'formik'

// components
import {
  Card,
  Button,
  Typography,
  GoBackButton,
  SelectFieldOption,
} from 'components'
import { AppointmentDetails } from './components'

// functions
import { Console } from 'utills/functions/ShowConsole'

export const BookAppointment = () => {
  const router = useRouter()

  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false)
  const [appointmentDetails, setappointmentDetails] = useState({})

  useEffect(() => {
    isAppointmentBooked &&
      setTimeout(() => {
        navigate('/students/appointments')
      }, 4000)
  }, [isAppointmentBooked, navigate])

  const initialValues = {
    placementCoordinator: {},
    appointmentType: {},
    appointmentDate: {},
    appointmentTime: {},
  }

  const validationSchema = yup.object({
    // businessName: yup.string().required("Some error occured!"),
    // abn: yup.string().required("Some error occured!"),
    // businessPhoneNumber: yup.string().required("Some error occured!"),
  })

  const onSubmit = (values) => {
    // <Navigate to="/privew-industry" />;
    // navigate("/privew-industry");
    setIsAppointmentBooked(true)
    setappointmentDetails(values)
    Console('values', values)
  }
  return isAppointmentBooked ? (
    <AppointmentDetails appointmentDetails={appointmentDetails} />
  ) : (
    <>
      <GoBackButton link={'students/appointments'}>
        Back To Appointments
      </GoBackButton>

      <Card mt={6}>
        <Typography variant={'subtitle'}>Book An Appointment</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ touched, errors, setFieldValue }) => {
            return (
              <Form className="mt-8">
                <div className="w-full md:w-1/2 mb-4">
                  <SelectFieldOption
                    label={'Placement Coordinator'}
                    fileupload={setFieldValue}
                    name={'placementCoordinator'}
                    options={[
                      { value: 'apple', label: 'Apple' },
                      { value: 'banana', label: 'Banana' },
                      { value: 'melon', label: 'Melon' },
                    ]}
                  />
                </div>

                <div className="w-full md:w-1/2 mb-4">
                  <SelectFieldOption
                    label={'Appointment Type'}
                    fileupload={setFieldValue}
                    name={'appointmentType'}
                    options={[
                      { value: 'apple', label: 'Apple' },
                      { value: 'banana', label: 'Banana' },
                      { value: 'melon', label: 'Melon' },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-8 mt-4 mb-6">
                  <SelectFieldOption
                    label={'Appointment Date'}
                    fileupload={setFieldValue}
                    name={'appointmentDate'}
                    options={[
                      { value: 'apple', label: 'Apple' },
                      { value: 'banana', label: 'Banana' },
                      { value: 'melon', label: 'Melon' },
                    ]}
                  />

                  <SelectFieldOption
                    label={'Appointment Time'}
                    fileupload={setFieldValue}
                    name={'appointmentTime'}
                    options={[
                      { value: 'apple', label: 'Apple' },
                      { value: 'banana', label: 'Banana' },
                      { value: 'melon', label: 'Melon' },
                    ]}
                  />
                </div>

                <Button type={'submit'}>Save</Button>
              </Form>
            )
          }}
        </Formik>
      </Card>
    </>
  )
}

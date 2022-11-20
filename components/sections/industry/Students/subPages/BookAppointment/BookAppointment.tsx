import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Card, Button, Typography, BackButton, Select } from 'components'
import { AppointmentDetails } from './components'

// functions
// import { Console } from 'utills/functions/ShowConsole'

export const IndustryBookAppointment = () => {
  const router = useRouter()

  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false)
  const [appointmentDetails, setappointmentDetails] = useState({})

  const validationSchema = yup.object({
    // businessName: yup.string().required("Some error occured!"),
    // abn: yup.string().required("Some error occured!"),
    // businessPhoneNumber: yup.string().required("Some error occured!"),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onSubmit = (values: any) => {
    // <Navigate to="/privew-industry" />;
    // navigate("/privew-industry");
    setIsAppointmentBooked(true)
    setappointmentDetails(values)
    // Console('values', values)
  }
  return isAppointmentBooked ? (
    <AppointmentDetails appointmentDetails={appointmentDetails} />
  ) : (
    <>
      <BackButton
        link={'students/appointments'}
        text={'Back To Appointments'}
      />

      <Card>
        <Typography variant={'subtitle'}>Book An Appointment</Typography>

        <FormProvider {...methods}>
          <form
            className="mt-2 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="w-full md:w-1/2 mb-4">
              <Select
                label={'Placement Coordinator'}
                name={'placementCoordinator'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'banana', label: 'Banana' },
                  { value: 'melon', label: 'Melon' },
                ]}
              />
            </div>

            <div className="w-full md:w-1/2 mb-4">
              <Select
                label={'Appointment Type'}
                name={'appointmentType'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'banana', label: 'Banana' },
                  { value: 'melon', label: 'Melon' },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-8 mt-4 mb-6">
              <Select
                label={'Appointment Date'}
                name={'appointmentDate'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'banana', label: 'Banana' },
                  { value: 'melon', label: 'Melon' },
                ]}
              />

              <Select
                label={'Appointment Time'}
                name={'appointmentTime'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  { value: 'banana', label: 'Banana' },
                  { value: 'melon', label: 'Melon' },
                ]}
              />
            </div>

            <Button submit text={'Save'} />
          </form>
        </FormProvider>
      </Card>
    </>
  )
}

import React from 'react'
import { useRouter } from 'next/router'

// Icons
import { BsFillCheckCircleFill } from 'react-icons/bs'

// components
import {
  ActionAlert,
  Button,
  Card,
  Typography,
} from '../../../../../../components'

export const AppointmentDetails = ({ appointmentDetails }) => {
  const router = useRouter()
  return (
    <div>
      <Card>
        <ActionAlert
          Icon={BsFillCheckCircleFill}
          title={'Appointment Booked Successfully'}
          description={'You will be redirected to jobs in a moment.'}
          iconsColor={'success'}
        />
      </Card>
      <Card mt={6}>
        <div className="border-b border-secondary-dark pb-1">
          <Typography variant={'muted'} color={'gray'}>
            Appointment Details
          </Typography>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-2 gap-y-4 py-4">
          {/* Placement Coordinator */}
          <div className="flex flex-col gap-y-1">
            <Typography variant={'muted'} color={'gray'}>
              Placement Coordinator
            </Typography>
            <Typography color={'black'}>
              {appointmentDetails?.placementCoordinator?.label}
            </Typography>
          </div>

          {/* Appointment Type */}
          <div className="flex flex-col gap-y-1">
            <Typography variant={'muted'} color={'gray'}>
              Appointment Type
            </Typography>
            <Typography color={'black'}>
              {appointmentDetails?.appointmentType?.label}
            </Typography>
          </div>

          {/*  Appointment Date */}
          <div className="flex flex-col gap-y-1">
            <Typography variant={'muted'} color={'gray'}>
              Appointment Date
            </Typography>
            <Typography color={'black'}>
              {appointmentDetails?.appointmentDate?.label}
            </Typography>
          </div>

          {/* Appointment Time */}
          <div className="flex flex-col gap-y-1">
            <Typography variant={'muted'} color={'gray'}>
              Appointment Time
            </Typography>
            <Typography color={'black'}>
              {appointmentDetails?.appointmentTime?.label}
            </Typography>
          </div>
        </div>

        {/*  */}
        <Button
          bgColor={'secondary'}
          textColor={'black'}
          onClick={() => navigate('/students/appointments')}
        >
          Back To Appointments
        </Button>
      </Card>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

// Icons
import { BsFillCheckCircleFill } from 'react-icons/bs'

// components
import {
  ActionAlert,
  Button,
  BackButton,
  TextInput,
  Card,
  Select,
  Typography,
} from 'components'
import { RightSidebarData } from './components'

// Context
import { useContextBar } from 'hooks'

export const Consultation = () => {
  const router = useRouter()
  const [isConsulted, setIsConsulted] = useState(false)
  const { setContent } = useContextBar()

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])

  useEffect(() => {
    isConsulted &&
      setTimeout(() => {
        router.push('/portals/industry/general-information')
      }, 2000)
  }, [isConsulted, router])

  const initialValues = {
    bsb: '',
    hours: '',
    accountName: '',
    accountNumber: '',
    selectYourCoordinator: {},
  }

  const validationSchema = yup.object({
    // businessName: yup.string().required("Some error occured!"),
    // abn: yup.string().required("Some error occured!"),
    // businessPhoneNumber: yup.string().required("Some error occured!"),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onSubmit = (values:any) => {
    // <Navigate to="/privew-industry" />;
    setIsConsulted(true)
  }
  return isConsulted ? (
    <Card>
      <ActionAlert
        title={'Successfully enrolled for Industry Consultation'}
        description={'You will be redirected to jobs in a moment.'}
        variant={'primary'}
      />
    </Card>
  ) : (
    <>
      <BackButton link={'/'} text={'Back To Dashboard'} />

      {/*  */}
      <Card>
        <Typography variant={'subtitle'}>Industry Consultation</Typography>

        {/*  */}
        <FormProvider {...methods}>
          <form
            className="mt-2 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="w-full md:w-1/2 my-4">
              <Select
                label={'Select Your Coordinator'}
                name={'selectYourCoordinator'}
                options={[
                  {
                    value: 'chocolate',
                    label: 'Chocolate',
                  },
                  {
                    value: 'strawberry',
                    label: 'Strawberry',
                  },
                  {
                    value: 'vanilla',
                    label: 'Vanilla',
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <TextInput
                label={'Hours/Session'}
                name={'hours'}
                placeholder={'Some Text Here...'}
              />
              <div className="flex flex-col mt-1">
                <Typography variant={'label'}>Chargeable Fee/Hour</Typography>
                <Typography variant={'label'}>$55</Typography>
              </div>
            </div>

            <Typography variant={'muted'} color={'gray'}>
              Company Bank Details
            </Typography>

            <div className="grid grid-cols-2 gap-x-4 my-4">
              <TextInput
                label={'Account Name'}
                name={'accountName'}
                placeholder={'Some Text Here...'}
              />
              <TextInput
                label={'BSB'}
                name={'bsb'}
                placeholder={'Some Text Here...'}
              />
            </div>

            <div className="mb-4">
              <TextInput
                label={'Account Number'}
                name={'accountNumber'}
                placeholder={'Some Text Here...'}
              />
            </div>

            <Button submit>
              Save
            </Button>
          </form>
        </FormProvider>
      </Card>
    </>
  )
}

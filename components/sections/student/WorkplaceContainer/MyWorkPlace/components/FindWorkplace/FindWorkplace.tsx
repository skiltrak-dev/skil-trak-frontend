import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Button } from 'components/buttons/Button'
import { Select, TextInput, RadioButton, RadioGroup } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// components
import { Card, Typography } from 'components'

import { useUpdateFindAbnMutation } from '@queries'
import { SignUpUtils } from '@utils'
type FindWorkplaceProps = {
  setActive: any
  setPersonalInfoData: any
  findAbn: any
}
export const FindWorkplace = ({
  setActive,
  setPersonalInfoData,
  findAbn,
}: FindWorkplaceProps) => {
  // const [updateFindAbn, result] = useUpdateFindAbnMutation()
  // console.log("Find AbN", result)


  const initialValues = {
    course: '',
    currentQualification: '',
    currentWork: '',
    haveTransport: '',
    haveDrivingLicense: '',
    preferableLocation: '',
  }

  const validationSchema = yup.object({
    // course: yup.string().required('Must provide course'),
    // currentQualification: yup
    //     .string()
    //     .required('Must provide currentQualification'),
    // currentWork: yup.string().required('Must provide currentWork'),
    // haveTransport: yup.string().required('Must provide haveTransport'),
    // haveDrivingLicense: yup
    //     .string()
    //     .required('Must provide haveDrivingLicense'),
    // preferableLocation: yup
    //     .string()
    //     .required('Must provide preferableLocation'),
  })

  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (values: any) => {
    findAbn(values)
    setActive((active: number) => active + 1)

  }

  return (
    <div>
      <Typography variant={'label'} capitalize>
        Please provide following information
      </Typography>
      <Card>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <TextInput
              name="abn"
              label="ABN"
              placeholder="ABN Code"
            />
            <Button text={'Find'} submit />
          </form>
        </FormProvider>
      </Card>
    </div>
  )
}

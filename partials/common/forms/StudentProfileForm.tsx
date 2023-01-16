import React, { useEffect } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Button, Card, TextInput, Typography } from '@components'

// utils
import { getDate, onlyAlphabets } from '@utils'

export const StudentProfileForm = ({ profile, result, onSubmit }: { profile: any; result: any; onSubmit: any }) => {
  const validationSchema = yup.object({
    // Profile Information
    name: yup
      .string()
      .matches(onlyAlphabets(), 'Please enter valid name')
      .required('Must provide your name'),

    email: yup
      .string()
      .email('Invalid Email')
      .required('Must provide email'),

    dob: yup.date().required('Must provide Date of Birth'),

    phone: yup.string().required('Must provide phone number'),

    // Contact Person Information
    emergencyPerson: yup
      .string()
      .matches(onlyAlphabets(), 'Must be a valid name'),
    emergencyPersonPhone: yup.string(),

    // Address Information
    addressLine1: yup.string().required('Must provide address'),
    state: yup.string().required('Must provide name of state'),
    suburb: yup.string().required('Must provide suburb name'),
    zipCode: yup.string().required('Must provide zip code for your state'),
  })

  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  })

  useEffect(() => {
    if (profile?.data && profile.isSuccess) {
      const {
        courses,
        result,
        rto,
        savedJobs,
        user,
        workplace,
        updatedAt,
        createdAt,
        ...rest
      } = profile?.data
      const values = {
        ...rest,
        ...user,
      }
      for (const key in values) {
        formMethods.setValue(key, values[key])
      }
    }
  }, [profile])
  return (
    <Card>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {/* Personal Information */}
          <div className="flex gap-x-16 border-t py-4">
            <div className="w-2/6">
              <Typography
                variant={'subtitle'}
                color={'text-gray-500'}
              >
                Student Information
              </Typography>
              <p className="text-gray-400 text-sm leading-6">
                Your information is required to make things
                clear and transparent
              </p>
            </div>

            <div className="w-4/6">
              <TextInput
                label={'Name'}
                name={'name'}
                placeholder={'Student Name...'}
                validationIcons
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <TextInput
                  label={'Phone Number'}
                  name={'phone'}
                  placeholder={'Your phone number...'}
                  validationIcons
                  required
                />
                <TextInput
                  label={'Family Name'}
                  name={'familyName'}
                  placeholder={'Family Name...'}
                  validationIcons
                  required
                />
                <TextInput
                  label={'Student ID'}
                  name={'studentId'}
                  placeholder={'Student ID...'}
                  validationIcons
                  required
                  disabled
                />
                <TextInput
                  label={'Date of Birth'}
                  name={'dob'}
                  type="date"
                  max={getDate()}
                  placeholder={'Date of Birth...'}
                  validationIcons
                  required
                />
                <TextInput
                  label={'Emergency Person'}
                  name={'emergencyPerson'}
                  placeholder={'Emergency Person...'}
                  validationIcons
                  required
                />
                <TextInput
                  label={'Emergency Person Phone'}
                  name={'emergencyPersonPhone'}
                  placeholder={'emergencyPersonPhone...'}
                  validationIcons
                  required
                />
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="flex gap-x-16 border-t py-4">
            <div className="w-2/6">
              <Typography
                variant={'subtitle'}
                color={'text-gray-500'}
              >
                Profile Information
              </Typography>
              <p className="text-gray-400 text-sm leading-6">
                This will be your information used as account
                login.
              </p>
            </div>

            <div className="w-4/6">
              <TextInput
                label={'Email'}
                name={'email'}
                type={'email'}
                placeholder={'Your Email...'}
                validationIcons
                required
                disabled
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="flex gap-x-16 border-t py-4">
            <div className="w-2/6">
              <Typography
                variant={'subtitle'}
                color={'text-gray-500'}
              >
                Address Information
              </Typography>
              <p className="text-gray-400 text-sm leading-6">
                This will help us to find out about your nearby
                sites
              </p>
            </div>

            <div className="w-4/6">
              <div className="grid grid-cols-1 gap-x-8">
                <TextInput
                  label={'Address Line 1'}
                  name={'addressLine1'}
                  placeholder={'Your Address Line 1...'}
                  validationIcons
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8">
                <TextInput
                  label={'Suburb'}
                  name={'suburb'}
                  placeholder={'Suburb...'}
                  validationIcons
                />

                <TextInput
                  label={'State'}
                  name={'state'}
                  placeholder={'State...'}
                  validationIcons
                />

                <TextInput
                  label={'Zip Code'}
                  name={'zipCode'}
                  placeholder={'Zip Code...'}
                  validationIcons
                />
              </div>
            </div>
          </div>

          <div className="w-4/6 ml-auto pl-12">
            <Button
              text={'Update'}
              submit
              loading={result.isLoading}
              disabled={result.isLoading}
            />
          </div>
        </form>
      </FormProvider>
    </Card>
  )
}

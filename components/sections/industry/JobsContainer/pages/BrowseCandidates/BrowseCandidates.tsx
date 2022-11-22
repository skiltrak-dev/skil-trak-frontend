import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
  Card,
  Button,
  EmptyData,
  LoadingAnimation,
  Typography,
  BackButton,
  Select,
} from '@components'
import { RightSidebarData } from './components'

// hooks
import { useContextBar } from '@hooks'

// query
import { useGetBrowseCandidatesQuery } from '@queries'
import { FutureCandidateCard } from '@components/sections/industry/components/FutureCandidateCard/FutureCandidateCard'

export const BrowseCandidatesContainer = () => {
  const { setContent } = useContextBar()
  const [browseCandidateData, setBrowseCandidateData] = useState<any | null>(
    null
  )

  console.log('browseCandidateData', browseCandidateData)

  const browseCandidates = useGetBrowseCandidatesQuery()

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])

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
    setBrowseCandidateData(values)
    console.log('values', values)
  }
  return (
    <div className="flex flex-col gap-y-4">
      <BackButton link={'jobs'} text={'Back To Jobs'} />

      {/*  */}
      <Card>
        <Typography variant={'subtitle'}>
          Candidate Matching Criteria
        </Typography>

        {/*  */}
        <FormProvider {...methods}>
          <form
            className="mt-2 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-x-4 my-4">
              <Select
                label={'Sector'}
                name={'placementCoordinator'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  {
                    value: 'banana',
                    label: 'Banana',
                  },
                  { value: 'melon', label: 'Melon' },
                ]}
                onlyValue
              />

              <Select
                label={'Course'}
                name={'appointmentType'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  {
                    value: 'banana',
                    label: 'Banana',
                  },
                  { value: 'melon', label: 'Melon' },
                ]}
                onlyValue
              />

              <Select
                label={'City'}
                name={'appointmentDate'}
                options={[
                  { value: 'apple', label: 'Apple' },
                  {
                    value: 'banana',
                    label: 'Banana',
                  },
                  { value: 'melon', label: 'Melon' },
                ]}
                onlyValue
              />
            </div>

            <Button submit text={'Apply Criteria'} />
          </form>
        </FormProvider>
      </Card>

      {/*  */}
      <Card>
        {/*  */}
        {browseCandidates.isError && 'Error'}

        <div className="mt-4">
          {browseCandidates.isLoading ? (
            <LoadingAnimation />
          ) : browseCandidates.data?.data?.length > 0 ? (
            <>
              <Typography variant={'subtitle'}>
                {browseCandidates?.data?.data?.length} Candidates Found
              </Typography>
              <Typography variant={'muted'} color={'gray'}>
                These candidates are being shown based on your company
                preferences
              </Typography>
              {browseCandidates?.data?.data?.map((browseCandidate) => (
                <FutureCandidateCard data={browseCandidate} />
              ))}
            </>
          ) : (
            !browseCandidates.isError && <EmptyData />
          )}
        </div>
      </Card>
    </div>
  )
}

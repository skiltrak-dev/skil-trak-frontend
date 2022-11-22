import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

// Icons
import { BsFillCheckCircleFill } from 'react-icons/bs'

// components
import {
  Action,
  Button,
  BackButton,
  Card,
  Popup,
  TextArea,
  Typography,
} from 'components'
import { UploadRPLDocs } from './components'

// hooks
import { useContextBar } from 'hooks'

// query
import { useAddRplMutation } from '@queries'

export const RPLForm = () => {
  const [addRpl, addRplResult] = useAddRplMutation()

  const [isRPLApplied] = useState(false)
  const [iseRPLSaved, setIseRPLSaved] = useState(false)

  const router = useRouter()
  const { setContent } = useContextBar()

  useEffect(() => {
    setContent(<></>)
  }, [setContent])

  useEffect(() => {
    isRPLApplied &&
      setTimeout(() => {
        navigate('/apply-for-rpl')
      }, 2000)
  }, [isRPLApplied, navigate])

  useEffect(() => {
    iseRPLSaved &&
      setTimeout(() => {
        setIseRPLSaved(false)
      }, 4000)
  }, [iseRPLSaved])

  // const initialValues = {
  //     cnic: '',
  //     resume: '',
  //     jobDescription: '',
  //     financialEvidence: [],
  //     academicDoc1: '',
  //     academicDoc2: '',
  //     academicDoc3: '',
  //     academicDocuments: [],
  // }

  const validationSchema = yup.object({
    // businessName: yup.string().required("Some error occured!"),
    // sector: yup.object({
    //   label: yup.string().required("Sector is required"),
    //   value: yup.string().required("Sector is required"),
    // }),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append('identity', values.cnic)
    formData.append('resume', values.resume)
    formData.append('jobDescription', values.jobDescription)
    values.financialEvidence.forEach((element) => {
      formData.append('financialEvidence', element)
    })
    values.academicDocuments.forEach((element) => {
      formData.append('academicDocuments', element)
    })

    await addRpl(formData)
    // <Navigate to="/privew-industry" />;
    // navigate("/portal-selection/create-account/review-your-information");
  }
  return (
    <>
      {/* <ShowErrorNotifications result={addRplResult} /> */}
      {iseRPLSaved && (
        <div className="w-full fixed top-1/2 left-1/3 -translate-y-1/2 z-50">
          <div className="max-w-465">
            <Popup
              title={'Saving RPL'}
              subtitle={'Please wait for a moment'}
              variant={'success'}
              shadow
            />
          </div>
        </div>
      )}
      {addRplResult.isSuccess && (
        <Card>
          {/* <Action
            Icon={BsFillCheckCircleFill}
            title={'Successfully Applied For RPL'}
            description={
              'This prompt should be shown, when some long or multiprocess has been completed, and now user need to return to home or some other page.'
            }
            iconsColor={'success'}
          /> */}
        </Card>
      )}
      <div className={`${isRPLApplied ? 'hidden' : ''}`}>
        <BackButton link={'apply-for-rpl'} text={'Back To RPL Instructions'} />

        <Card>
          <FormProvider {...methods}>
            <form
              className="mt-2 w-full"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Typography variant={'title'}>Your Identity</Typography>
              <Typography variant={'muted'}>
                Passport, Drivers Licence, Utility bills, Any photo ID etc.
              </Typography>

              <div className="mt-1.5 max-w-220">
                <UploadRPLDocs
                  name={'cnic'}
                  fileupload={setFieldValue}
                  acceptFiles={'application/pdf'}
                />
              </div>

              <div className="mt-4">
                <Typography variant={'title'}>Detailed Resume</Typography>
                <Typography variant={'muted'}>
                  Resume must contain true information about your academic
                  details & Job information.
                </Typography>

                <div className="flex justify-between items-end gap-x-6">
                  <div className="mt-1.5 w-1/4">
                    <UploadRPLDocs
                      name={'resume'}
                      fileupload={setFieldValue}
                      acceptFiles={'application/pdf'}
                    />
                  </div>
                  <div className="w-3/4">
                    <TextArea
                      label={'Job Description'}
                      name={'jobDescription'}
                      validationIcons
                    />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Typography variant={'title'}>
                  Payslip or Financial Evidence
                </Typography>
                <Typography variant={'muted'}>
                  The most recent one to justify that you are working in the
                  industry.
                </Typography>

                <div className="mt-1.5 max-w-220">
                  <UploadRPLDocs
                    name={'financialEvidence[0]'}
                    fileupload={setFieldValue}
                    acceptFiles={'application/pdf'}
                  />
                </div>
              </div>

              <div className="my-4">
                <Typography variant={'title'}>Academic Documents</Typography>
                <Typography variant={'muted'}>
                  All other past or most recent degrees or certification that
                  you achieved either in Australia
                </Typography>

                <div className="mt-1.5 flex gap-x-3 w-full md:w-5/6">
                  <UploadRPLDocs
                    name={'academicDocuments[0]'}
                    fileupload={setFieldValue}
                    acceptFiles={'application/pdf'}
                  />
                  <UploadRPLDocs
                    name={'academicDocuments[1]'}
                    fileupload={setFieldValue}
                    acceptFiles={'application/pdf'}
                  />
                  <UploadRPLDocs
                    name={'academicDocuments[2]'}
                    fileupload={setFieldValue}
                    acceptFiles={'application/pdf'}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant={'secondary'}
                  onClick={() => setIseRPLSaved(true)}
                >
                  Save
                </Button>
                <Button
                  submit
                  loading={addRplResult?.isLoading}
                  disabled={addRplResult?.isLoading}
                >
                  Continue
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </>
  )
}

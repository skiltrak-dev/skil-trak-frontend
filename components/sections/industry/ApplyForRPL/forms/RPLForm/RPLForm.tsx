import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import {
    ActionAlert,
    BackButton,
    Button,
    Card,
    Popup,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    Typography,
} from '@components'
import { InputErrorMessage } from '@components/inputs/components'

import { UploadRPLDocs } from './components'

// hooks

// query
import { useAddRplMutation } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'

export const RPLForm = ({
    onBackClicked,
    industryUserId,
}: {
    onBackClicked?: () => void
    industryUserId?: number
}) => {
    const [addRpl, addRplResult] = useAddRplMutation()
    const [isRPLApplied] = useState(false)
    const [iseRPLSaved, setIseRPLSaved] = useState(false)

    const router = useRouter()

    useEffect(() => {
        iseRPLSaved &&
            setTimeout(() => {
                setIseRPLSaved(false)
            }, 4000)
    }, [iseRPLSaved])

    const validationSchema = yup.object().shape({
        // identity: yup
        //     .mixed()
        //     .test('file', 'You need to provide a Identity', (value) => {
        //         if (value || value?.length > 0) {
        //             return true
        //         }
        //         return false
        //     }),
        // resume: yup
        //     .mixed()
        //     .test('file', 'You need to provide a Resume', (value) => {
        //         if (value || value?.length > 0) {
        //             return true
        //         }
        //         return false
        //     }),
        // financialEvidence: yup
        //     .mixed()
        //     .test('file', 'You need to provide a file', (value) => {
        //         if (value || value?.length > 0) {
        //             return true
        //         }
        //         return false
        //     }),
        // academicDocuments: yup
        //     .mixed()
        //     .test(
        //         'file',
        //         'You need to provide all Academic Documents',
        //         (values) => {
        //             if (values?.every((file: any) => file)) {
        //                 return true
        //             }
        //             return false
        //         }
        //     ),

        course: yup.string().required(),
        jobDescription: yup.string().required(),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const formData = new FormData()
        const { academicDocuments, ...rest } = values
        Object.entries({ ...rest, userId: industryUserId }).forEach(
            ([key, value]: any) => {
                if (value) {
                    formData.append(key, value)
                }
            }
        )
        values?.academicDocuments
            ?.filter((a: any) => a)
            ?.forEach((file: any) => {
                formData.append('academicDocuments', file)
            })
        await addRpl(formData)
    }

    const UploadFile = ({
        title,
        subtitle,
        name,
    }: {
        title: string
        subtitle: string
        name: string
    }) => (
        <div className="space-y-1.5">
            <Typography variant={'title'}>{title}</Typography>
            <Typography variant={'muted'}>{subtitle}</Typography>

            <div className="max-w-220">
                <UploadRPLDocs
                    name={name}
                    acceptFiles={'application/pdf'}
                    required
                />
            </div>
        </div>
    )
    return (
        <>
            {!onBackClicked && (
                <BackButton
                    link={'/portals/industry/tasks'}
                    text={'Back To RPL Instructions'}
                />
            )}
            <ShowErrorNotifications result={addRplResult} />
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
                <ActionAlert
                    title={'RPL Submission Successful!'}
                    description={'Your RPL has been submitted successfully.'}
                    variant={'primary'}
                    primaryAction={{
                        text: 'Go Back',
                        onClick: () => {
                            if (onBackClicked) {
                                onBackClicked()
                            } else {
                                router.push(`/portals/industry`)
                            }
                        },
                    }}
                />
            )}
            <div className={`${isRPLApplied ? 'hidden' : ''}`}>
                {!addRplResult.isSuccess && (
                    <Card>
                        <FormProvider {...methods}>
                            <form
                                className=" w-full"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <div className="w-full">
                                    <TextInput
                                        label={'Course'}
                                        name={'course'}
                                        validationIcons
                                        required
                                        placeholder="Add a course name"
                                    />
                                </div>
                                <div className="w-full">
                                    <TextArea
                                        label={'Job Description'}
                                        name={'jobDescription'}
                                        validationIcons
                                        placeholder="Please provide some information, how many employees do you need"
                                        rows={6}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <UploadFile
                                        name="identity"
                                        title="Your Identity"
                                        subtitle="Passport, Drivers Licence, Utility
                                            bills, Any photo ID etc."
                                    />
                                    <UploadFile
                                        name="resume"
                                        title="Detailed Resume"
                                        subtitle="Resume must contain true information
                                            about your academic details & Job
                                            information."
                                    />

                                    <UploadFile
                                        name="financialEvidence"
                                        title="Payslip or Financial Evidence"
                                        subtitle="The most recent one to justify that
                                            you are working in the industry."
                                    />
                                </div>

                                <div>
                                    <Typography variant={'title'}>
                                        Academic Documents
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        All other past or most recent degrees or
                                        certification that you achieved either
                                        in Australia
                                    </Typography>

                                    <div className="mt-1.5 flex gap-x-3 w-full">
                                        <UploadRPLDocs
                                            name={'academicDocuments[0]'}
                                            acceptFiles={'application/pdf'}
                                        />
                                        <UploadRPLDocs
                                            name={'academicDocuments[1]'}
                                            acceptFiles={'application/pdf'}
                                        />
                                        <UploadRPLDocs
                                            name={'academicDocuments[2]'}
                                            acceptFiles={'application/pdf'}
                                        />
                                    </div>
                                    <InputErrorMessage
                                        name={'academicDocuments'}
                                    />
                                </div>

                                <div className="flex justify-between items-center">
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
                )}
            </div>
        </>
    )
}

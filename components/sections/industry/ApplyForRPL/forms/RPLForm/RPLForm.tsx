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
    TextArea,
    Typography,
} from '@components'
import { InputErrorMessage } from '@components/inputs/components'

import { UploadRPLDocs } from './components'

// hooks

// query
import { useAddRplMutation } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'

export const RPLForm = () => {
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
        identity: yup
            .mixed()
            .test('file', 'You need to provide a Identity', (value) => {
                if (value || value?.length > 0) {
                    return true
                }
                return false
            }),
        resume: yup
            .mixed()
            .test('file', 'You need to provide a Resume', (value) => {
                if (value || value?.length > 0) {
                    return true
                }
                return false
            }),
        financialEvidence: yup
            .mixed()
            .test('file', 'You need to provide a file', (value) => {
                if (value || value?.length > 0) {
                    return true
                }
                return false
            }),
        academicDocuments: yup
            .mixed()
            .test(
                'file',
                'You need to provide all Academic Documents',
                (values) => {
                    if (values?.every((file: any) => file)) {
                        return true
                    }
                    return false
                }
            ),

        jobDescription: yup.string().required(),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const formData = new FormData()
        const { academicDocuments, ...rest } = values
        Object.keys(rest).forEach((file: any) => {
            formData.append(file, values[file])
        })
        values?.academicDocuments?.forEach((file: any) => {
            formData.append('academicDocuments', file)
        })
        await addRpl(formData)
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
                <ActionAlert
                    title={'Student Added Successfully!'}
                    description={
                        'You will be redirected to student list in a moment.'
                    }
                    variant={'primary'}
                    primaryAction={{
                        text: 'Back To List',
                        onClick: () => {
                            router.push(`/portals/industry`)
                        },
                    }}
                />
            )}
            <div className={`${isRPLApplied ? 'hidden' : ''}`}>
                <BackButton
                    link={'apply-for-rpl'}
                    text={'Back To RPL Instructions'}
                />
                {!addRplResult.isSuccess && (
                    <Card>
                        <FormProvider {...methods}>
                            <form
                                className="mt-2 w-full"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <Typography variant={'title'}>
                                    Your Identity
                                </Typography>
                                <Typography variant={'muted'}>
                                    Passport, Drivers Licence, Utility bills,
                                    Any photo ID etc.
                                </Typography>

                                <div className="mt-1.5 max-w-220">
                                    <UploadRPLDocs
                                        name={'identity'}
                                        acceptFiles={'application/pdf'}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Typography variant={'title'}>
                                        Detailed Resume
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        Resume must contain true information
                                        about your academic details & Job
                                        information.
                                    </Typography>

                                    <div className="flex justify-between items-end gap-x-6">
                                        <div className="mt-1.5 w-1/4">
                                            <UploadRPLDocs
                                                name={'resume'}
                                                acceptFiles={'application/pdf'}
                                                required
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
                                        The most recent one to justify that you
                                        are working in the industry.
                                    </Typography>

                                    <div className="mt-1.5 max-w-220">
                                        <UploadRPLDocs
                                            name={'financialEvidence'}
                                            acceptFiles={'application/pdf'}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="my-4">
                                    <Typography variant={'title'}>
                                        Academic Documents
                                    </Typography>
                                    <Typography variant={'muted'}>
                                        All other past or most recent degrees or
                                        certification that you achieved either
                                        in Australia
                                    </Typography>

                                    <div className="mt-1.5 flex gap-x-3 w-full md:w-5/6">
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
                )}
            </div>
        </>
    )
}

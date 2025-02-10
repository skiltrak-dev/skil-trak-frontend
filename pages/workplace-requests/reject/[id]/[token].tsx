import { Button, ShowErrorNotifications, TextArea } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SiteLayout } from '@layouts'
import { StudentApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const DynamicPageData = () => {
    const [comment, setComment] = useState('')

    const router = useRouter()
    const { notification } = useNotification()

    const reject = StudentApi.Workplace.rejectIndustryFromEmail(
        {
            comment,
            status: 'rejected',
            id: Number(router?.query?.id),
        },
        {
            skip: !comment,
        }
    )

    useEffect(() => {
        if (reject?.isSuccess) {
            notification.success({
                title: 'Industry Rejected',
                description: 'Industry Rejected Successfully!',
            })
            setComment('')
            router.push('/')
        }
    }, [reject])

    const validationSchema = Yup.object({
        message: Yup.string().required('Message is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        setComment(values?.message)
        // const res: any = await reject(values)

        // if (res?.data) {
        //     notification.success({
        //         title: 'Industry Rejected',
        //         description: 'Industry Rejected Successfully!',
        //     })
        // }
    }
    return (
        <SiteLayout>
            <ShowErrorNotifications result={reject} />
            <div className="max-w-7xl mx-auto py-5 md:py-10">
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="">
                            <TextArea
                                label={'The reason for Rejection'}
                                name={'message'}
                                rows={10}
                                placeholder={'The reason for Rejection...'}
                                validationIcons
                                required
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Button
                                submit
                                variant="error"
                                loading={reject.isLoading}
                                disabled={reject.isLoading}
                            >
                                Reject
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </SiteLayout>
    )
}

export default DynamicPageData

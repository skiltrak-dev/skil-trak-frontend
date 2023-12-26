import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import {
    ActionAlert,
    ActionButton,
    Card,
    LoadingAnimation,
    PageTitle,
    StepIndicator,
    Typography,
} from '@components'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'

// query
import { useNotification } from '@hooks'
import { AddCustomIndustryForm, FindWorkplaceForm } from '@partials/common'
import {
    ExistinIndustryCard,
    IndustrySelection,
} from '@partials/sub-admin/students'
import {
    SubAdminApi,
    useAddCustomIndustyForWorkplaceMutation,
    useFindByAbnWorkplaceMutation,
    useGetSubAdminStudentDetailQuery,
    useGetSubAdminStudentWorkplaceQuery,
    useSubAdminCancelStudentWorkplaceRequestMutation,
} from '@queries'
import { UserRoles } from '@constants'

type Props = {}

const ProvideWorkplaceDetail: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})
    const [industryABN, setIndustryABN] = useState<string | null>(null)
    const [isCancelled, setIsCancelled] = useState<boolean>(false)

    const [workplaceData, setWorkplaceData] = useState<any | null>(null)
    const { notification } = useNotification()

    // query
    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })
    const workplace = useGetSubAdminStudentWorkplaceQuery(Number(id), {
        skip: !id,
    })
    const courses = SubAdminApi.Student.useCourses(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [findAbn, result] = useFindByAbnWorkplaceMutation()
    const [addWorkplace, addWorkplaceResult] =
        useAddCustomIndustyForWorkplaceMutation()
    const [cancelRequest, cancelRequestResult] =
        useSubAdminCancelStudentWorkplaceRequestMutation()

    useEffect(() => {
        if (addWorkplaceResult.isSuccess && addWorkplaceResult.data) {
            setWorkplaceData(addWorkplaceResult.data?.workplaceRequest)
            setActive((active: number) => active + 1)
        }
    }, [addWorkplaceResult])

    useEffect(() => {
        if (
            workplace.isSuccess &&
            workplace?.data &&
            workplace?.data?.length > 0
        ) {
            setActive(3)
            setWorkplaceData(workplace?.data)
        }
    }, [workplace])

    useEffect(() => {
        if (!result.data && result.isSuccess) {
            notification.error({
                title: 'Industry Not Found',
                description:
                    'Your Industry Not found in our record, we are redirecting you to industry signup page, pleae provide the details',
            })
            setTimeout(() => {
                setActive((active: number) => active + 1)
            }, 2000)
        }
        if (result.data && result.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [result])

    // useEffect(() => {
    //     if (workplace.isSuccess && workplace.data.length > 0) {
    //         setActive(3)
    //     }
    // }, [workplace.data, workplace.isSuccess])

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            setActive(1)
        }
    }, [cancelRequestResult.isSuccess])

    const workplaceCancelRequest = (simple: boolean = false) => {
        return (
            <div className="mt-3">
                <ActionButton
                    variant={'error'}
                    onClick={async () => {
                        await cancelRequest(workplace?.data[0]?.id)
                    }}
                    loading={cancelRequestResult.isLoading}
                    disabled={cancelRequestResult.isLoading}
                    simple={simple}
                >
                    Cancel Request
                </ActionButton>
            </div>
        )
    }

    const StepIndicatorOptions = [
        {
            label: 'Personal Info',
            visited: false,
            last: false,
        },
        {
            label: 'Your Industry',
            visited: false,
            last: false,
        },
        {
            label: 'Select Industry',
            visited: false,
            last: false,
        },
        {
            label: 'Wait For Approval',
            visited: false,
            last: true,
        },
    ]

    const onSubmit = (values: any) => {
        findAbn(values?.abn)
        setIndustryABN(values?.abn)
        // setActive((active: number) => active + 1)
    }

    const onIndustryAdd = (values: any) => {
        addWorkplace({
            id: data?.user?.id,
            body: {
                ...values,
                courses: [values?.courses],
                role: UserRoles.INDUSTRY,
                password: 'NA',
            },
        })
    }

    return (
        <>
            <PageTitle
                title="Provide Workplace Detail"
                backTitle="Student Detail"
            />
            <div className="mt-10">
                {workplace?.isLoading || workplace?.isFetching ? (
                    <LoadingAnimation />
                ) : (
                    <div className="flex gap-x-5 w-full">
                        <ShowErrorNotifications result={addWorkplaceResult} />
                        {/* <GoBackButton>Workplace Choice</GoBackButton> */}
                        {/*  */}

                        <div className="py-4 w-[25%]">
                            <StepIndicator
                                steps={StepIndicatorOptions}
                                currentStep={StepIndicatorOptions[active - 1]}
                                vertical
                            />
                        </div>
                        <div className="w-[75%]">
                            {active === 1 && (
                                <FindWorkplaceForm
                                    onSubmit={onSubmit}
                                    result={result}
                                />
                            )}

                            {active === 2 &&
                                (result?.data ? (
                                    <ExistinIndustryCard
                                        setActive={setActive}
                                        personalInfoData={personalInfoData}
                                        res={result}
                                        industry={result?.data}
                                        setWorkplaceData={setWorkplaceData}
                                        student={data?.user?.id}
                                        studentId={data?.id}
                                    />
                                ) : (
                                    <AddCustomIndustryForm
                                        setWorkplaceData={setWorkplaceData}
                                        result={addWorkplaceResult}
                                        industryABN={industryABN}
                                        onSubmit={onIndustryAdd}
                                        setActive={setActive}
                                        courses={courses?.data}
                                    />
                                ))}

                            {active === 3 && (
                                <>
                                    {workplaceData[0]?.industryStatus ===
                                    UserStatus.Approved ? (
                                        <IndustrySelection
                                            setActive={setActive}
                                            workplace={workplace}
                                            userId={Number(data?.user?.id)}
                                            studentProvidedWorkplace
                                            setIsCancelled={(e: any) => {
                                                setIsCancelled(e)
                                            }}
                                            isCancelled={isCancelled}
                                        />
                                    ) : workplaceData[0]?.industryStatus ===
                                      UserStatus.Rejected ? (
                                        <Card>
                                            <div className="px-5 py-16 border-2 border-dashed border-gray-600 flex justify-center">
                                                <Typography
                                                    variant={'label'}
                                                    center
                                                    color={'text-gray-700'}
                                                >
                                                    Your Workplace Industry has
                                                    been Rejected, You can
                                                    recreate a workplace after
                                                    canceling the workplace
                                                </Typography>
                                            </div>
                                            {workplaceCancelRequest()}
                                        </Card>
                                    ) : (
                                        <Card>
                                            <div className="px-5 py-16 border-2 border-dashed border-gray-600 flex justify-center">
                                                <Typography
                                                    variant={'label'}
                                                    center
                                                    color={'text-gray-700'}
                                                >
                                                    Your request has been
                                                    received, Our team after
                                                    confirming the provided
                                                    information will approved
                                                    your request and Will
                                                    Contact you soon
                                                </Typography>
                                            </div>
                                            {workplaceCancelRequest()}
                                        </Card>
                                    )}
                                </>
                            )}

                            {active === 4 && (
                                <Card>
                                    <ActionAlert
                                        title={
                                            'Your Request Has Been Place Successfully!'
                                        }
                                        description={
                                            'This prompt should be shown, when some long or multiprocess has been completed, and now user need to return to home or some other page.'
                                        }
                                        variant={'primary' || 'info' || 'error'}
                                        primaryAction={{
                                            text: 'Go Back',
                                            onClick: () => {
                                                setActive(1)
                                            },
                                        }}
                                    />
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
ProvideWorkplaceDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default ProvideWorkplaceDetail

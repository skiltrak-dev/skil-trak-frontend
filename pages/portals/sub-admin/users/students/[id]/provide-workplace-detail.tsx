import { ReactElement, useEffect, useState } from 'react'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
    ActionAlert,
    ActionAlertType,
    Card,
    LoadingAnimation,
    Typography,
    StepIndicator,
    ActionButton,
} from '@components'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { YourIndustry } from '@components/sections/student/WorkplaceContainer/MyWorkPlace'

// query
import {
    useUpdateFindAbnMutation,
    useAddWorkplaceMutation,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import { FindWorkplace } from '@components/sections/student/WorkplaceContainer/MyWorkPlace/components/FindWorkplace'
import { IndustryForm } from '@components/sections/student/WorkplaceContainer/MyWorkPlace/IndustryForm'
import { useNotification } from '@hooks'
import { AppliedIndustry } from '@components/sections/student/WorkplaceContainer/MyWorkPlace/components/IndustrySelection/AppliedIndustry'

type Props = {}

const ProvideWorkplaceDetail: NextPageWithLayout = (props: Props) => {
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})
    const [industryABN, setIndustryABN] = useState<string | null>(null)

    const [workplaceData, setWorkplaceData] = useState<any | null>(null)
    const { notification } = useNotification()

    // query
    const workplace = useGetWorkplaceIndustriesQuery()
    const [findAbn, result] = useUpdateFindAbnMutation()
    const [addWorkplace, addWorkplaceResult] = useAddWorkplaceMutation()

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
            setWorkplaceData(workplace?.data[0])
            setActive(3)
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

    const workplaceCancelRequest = (simple: boolean = false) => {
        return (
            <div className="mt-3">
                <ActionButton
                    variant={'error'}
                    onClick={async () => {
                        // await cancelRequest(null)
                    }}
                    // loading={cancelRequestResult.isLoading}
                    // disabled={cancelRequestResult.isLoading}
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
        findAbn(values)
        setIndustryABN(values?.abn)
        // setActive((active: number) => active + 1)
    }

    return workplace?.isLoading ? (
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
                    <FindWorkplace onSubmit={onSubmit} result={result} />
                )}

                {active === 2 &&
                    (!result?.data ? (
                        <IndustryForm
                            addWorkplace={addWorkplace}
                            setWorkplaceData={setWorkplaceData}
                            result={addWorkplaceResult}
                            industryABN={industryABN}
                        />
                    ) : (
                        <YourIndustry
                            setActive={setActive}
                            personalInfoData={personalInfoData}
                            res={result}
                            industry={result?.data}
                            setWorkplaceData={setWorkplaceData}
                        />
                    ))}

                {active === 3 &&
                    (workplaceData?.studentProvidedWorkplace ||
                        workplaceData?.byExistingAbn) &&
                    (workplaceData?.industryStatus === 'approved' ? (
                        <AppliedIndustry
                            workplaceCancelRequest={workplaceCancelRequest}
                            appliedIndustry={workplaceData[0]?.industries[0]}
                            status={workplaceData?.currentStatus}
                            workplaceRequest={workplaceData}
                            studentAdded
                        />
                    ) : workplaceData?.industryStatus === 'rejected' ? (
                        <Card>
                            <div className="px-5 py-16 border-2 border-dashed border-gray-600 flex justify-center">
                                <Typography
                                    variant={'label'}
                                    center
                                    color={'text-gray-700'}
                                >
                                    Your Workplace Industry has been Rejected,
                                    You can recreate a workplace after canceling
                                    the workplace
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
                                    Your request has been received, Our team
                                    after confirming the provided information
                                    will approved your request and Will Contact
                                    you soon
                                </Typography>
                            </div>
                            {workplaceCancelRequest()}
                        </Card>
                    ))}

                {active === 4 && (
                    <Card>
                        <ActionAlert
                            title={'Your Request Has Been Place Successfully!'}
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
    )
}
ProvideWorkplaceDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default ProvideWorkplaceDetail

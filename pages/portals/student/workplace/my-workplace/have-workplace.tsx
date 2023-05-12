import { ReactElement, useEffect, useState } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'
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

// query
import {
    useUpdateFindAbnMutation,
    useAddWorkplaceMutation,
    useCancelWorkplaceRequestMutation,
    useGetWorkplaceIndustriesQuery,
} from '@queries'
import { useNotification } from '@hooks'
import { AddCustomIndustryForm, FindWorkplaceForm } from '@partials/common'
import { AppliedIndustry, ExistingIndustryCard } from '@partials/student'
import { MediaQueries } from '@constants'
import { useMediaQuery } from 'react-responsive'

type Props = {}

const HaveWorkplace: NextPageWithLayout = (props: Props) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})
    const [industryABN, setIndustryABN] = useState<string | null>(null)

    const [industryNotFound, setIndustryNotFound] = useState(false)

    const [workplaceData, setWorkplaceData] = useState<any | null>({})
    const { notification } = useNotification()

    // query
    const workplace = useGetWorkplaceIndustriesQuery()
    const [findAbn, result] = useUpdateFindAbnMutation()
    const [addWorkplace, addWorkplaceResult] = useAddWorkplaceMutation()

    const [cancelRequest, cancelRequestResult] =
        useCancelWorkplaceRequestMutation()

    useEffect(() => {
        if (addWorkplaceResult.isSuccess && addWorkplaceResult.data) {
            notification.success({
                title: 'Workplace request sent',
                description: 'Workplace Request sent to your coordinator',
            })
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
            setIndustryNotFound(true)
            setTimeout(() => {
                setActive((active: number) => active + 1)
            }, 3000)
        }
        if (result.data && result.isSuccess) {
            setActive((active: number) => active + 1)
        }
    }, [result])

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
                        await cancelRequest()
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
            label: 'Search Industry',
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

    const onAddIndustry = (values: any) => {
        addWorkplace({
            ...values,
            courses: [values?.courses?.value],
            role: 'industry',
            password: 'NA',
        })
    }

    return (
        <>
            <ShowErrorNotifications result={addWorkplaceResult} />
            {workplace?.isLoading || workplace?.isLoading ? (
                <LoadingAnimation />
            ) : (
                <div className="flex flex-col md:flex-row gap-x-5 w-full">
                    {/* <GoBackButton>Workplace Choice</GoBackButton> */}

                    {/*  */}
                    <div className="py-4 w-full md:w-[25%]">
                        <StepIndicator
                            steps={StepIndicatorOptions}
                            currentStep={StepIndicatorOptions[active - 1]}
                            vertical={!isMobile}
                        />
                    </div>

                    <div className="w-full md:w-[75%]">
                        {active === 1 && (
                            <div>
                                {industryNotFound ? (
                                    <div className="bg-red-200 rounded-lg px-2 py-1 mb-2">
                                        <p className="text-sm font-semibold text-red-500">
                                            Industry for provided ABN not found
                                        </p>
                                        <p className="text-xs text-red-400">
                                            You will be redirected to Industry
                                            Form so you can add your
                                            industry&apos;s information
                                        </p>
                                    </div>
                                ) : null}
                                <FindWorkplaceForm
                                    onSubmit={onSubmit}
                                    result={result}
                                />
                            </div>
                        )}

                        {active === 2 &&
                            (!result?.data ? (
                                <div className="mb-4">
                                    <AddCustomIndustryForm
                                        onSubmit={onAddIndustry}
                                        setWorkplaceData={setWorkplaceData}
                                        result={addWorkplaceResult}
                                        industryABN={industryABN}
                                        setActive={setActive}
                                    />
                                </div>
                            ) : (
                                <ExistingIndustryCard
                                    setActive={setActive}
                                    personalInfoData={personalInfoData}
                                    res={result}
                                    industry={result?.data}
                                    setWorkplaceData={setWorkplaceData}
                                />
                            ))}

                        {active === 3 && (
                            <>
                                {(workplaceData?.industryStatus ===
                                    UserStatus.Approved &&
                                    workplaceData?.approvalStatus ===
                                        UserStatus.Approved) ||
                                workplaceData?.byExistingAbn ? (
                                    <AppliedIndustry
                                        workplaceCancelRequest={
                                            workplaceCancelRequest
                                        }
                                        appliedIndustry={
                                            workplaceData?.industries[0]
                                        }
                                        status={workplaceData?.currentStatus}
                                        workplaceRequest={workplaceData}
                                        studentAdded
                                    />
                                ) : workplaceData?.industryStatus ===
                                  'rejected' ? (
                                    <Card>
                                        <div className="px-5 py-16 border-2 border-dashed border-gray-600 flex justify-center">
                                            <Typography
                                                variant={'label'}
                                                center
                                                color={'text-gray-700'}
                                            >
                                                Your Workplace Industry has been
                                                Rejected, You can recreate a
                                                workplace after canceling the
                                                workplace
                                            </Typography>
                                        </div>
                                        {workplaceCancelRequest()}
                                    </Card>
                                ) : workplaceData?.studentProvidedWorkplace ? (
                                    <Card>
                                        <div className="px-5 py-16 border-2 border-dashed border-gray-600 flex justify-center">
                                            <Typography
                                                variant={'label'}
                                                center
                                                color={'text-gray-700'}
                                            >
                                                Your request has been received,
                                                Our team after confirming the
                                                provided information will
                                                approved your request and Will
                                                Contact you soon
                                            </Typography>
                                        </div>
                                        {workplaceCancelRequest()}
                                    </Card>
                                ) : null}
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
        </>
    )
}
HaveWorkplace.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout
            pageTitle={{ title: 'Add Workplace', backTitle: 'Workplace' }}
        >
            {page}
        </StudentLayout>
    )
}

export default HaveWorkplace

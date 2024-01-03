import { ReactElement, useEffect, useState } from 'react'

import {
    LoadingAnimation,
    PageTitle,
    StepIndicator,
    TechnicalError,
} from '@components'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import {
    Availability,
    IndustrySelection,
    PersonalInfo,
} from '@partials/sub-admin/students'
import {
    useGetSubAdminStudentDetailQuery,
    useGetSubAdminStudentWorkplaceQuery,
} from '@queries'
import { useRouter } from 'next/router'

type Props = {}

const RequestWorkplaceDetail: NextPageWithLayout = (props: Props) => {
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})
    const [availabilities, setAvailabilities] = useState<any | null>(Array())
    const [isCancelled, setIsCancelled] = useState<boolean>(false)

    const router = useRouter()
    const { id } = router.query

    // query
    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })
    const workplace = useGetSubAdminStudentWorkplaceQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })

    // useEffect(() => {
    //     if (
    //         workplace?.data &&
    //         workplace.isSuccess &&
    //         workplace?.data?.length > 0
    //     ) {
    //         if (workplace?.data[0]?.currentStatus === 'placementStarted')
    //             setActive(4)
    //         else setActive(3)
    //     }
    //     // else if (!workplace?.data?.length) {
    //     //     setActive(1)
    //     // }
    // }, [workplace])
    useEffect(() => {
        if (
            workplace.data &&
            workplace.isSuccess &&
            workplace.data.length > 0
        ) {
            if (workplace.data[0].currentStatus === 'placementStarted') {
                setActive(4)
            } else {
                setActive(3)
            }
        }
    }, [workplace.data])

    const StepIndicatorOptions = [
        {
            label: 'Personal Info',
            visited: false,
            last: false,
        },
        {
            label: 'General Availability',
            visited: false,
            last: false,
        },
        {
            label: 'Select Industry',
            visited: false,
            last: false,
        },
        {
            label: 'Placement Progress',
            visited: false,
            last: true,
        },
    ]

    console.log('active', active)
    return (
        <>
            <PageTitle
                title="Request Workplace Detail"
                backTitle="Student Detail"
            />

            <div className="mt-10">
                {workplace.isError && <TechnicalError />}
                {workplace.isLoading || workplace?.isFetching ? (
                    <LoadingAnimation />
                ) : (
                    !workplace?.isError && (
                        <div className="flex gap-x-5 w-full">
                            {/* <GoBackButton>Workplace Choice</GoBackButton> */}

                            {/*  */}
                            <div className="py-4 w-[25%]">
                                <StepIndicator
                                    steps={StepIndicatorOptions}
                                    currentStep={
                                        StepIndicatorOptions[active - 1]
                                    }
                                    vertical
                                />
                            </div>

                            <div className="w-[75%]">
                                {active === 1 && (
                                    <PersonalInfo
                                        setActive={setActive}
                                        setPersonalInfoData={
                                            setPersonalInfoData
                                        }
                                        personalInfoData={personalInfoData}
                                    />
                                )}

                                {active === 2 && (
                                    <Availability
                                        setActive={setActive}
                                        personalInfoData={personalInfoData}
                                        userId={Number(data?.user?.id)}
                                        setAvailabilities={setAvailabilities}
                                        availabilities={availabilities}
                                    />
                                )}

                                {(active === 3 || active === 4) && (
                                    <IndustrySelection
                                        setActive={setActive}
                                        workplace={workplace}
                                        userId={Number(data?.user?.id)}
                                        setIsCancelled={(e: any) => {
                                            setIsCancelled(e)
                                        }}
                                        isCancelled={isCancelled}
                                    />
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}
RequestWorkplaceDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default RequestWorkplaceDetail

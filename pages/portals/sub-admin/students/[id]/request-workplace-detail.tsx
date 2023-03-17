import { ReactElement, useEffect, useState } from 'react'

import {
    LoadingAnimation,
    PageTitle,
    StepIndicator,
    TechnicalError,
} from '@components'

import { StudentLayout, SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import {
    useGetSubAdminStudentWorkplaceQuery,
    useGetSubAdminStudentDetailQuery,
} from '@queries'
import { useRouter } from 'next/router'
import {
    Availability,
    PersonalInfo,
    IndustrySelection,
} from '@partials/sub-admin/students'

type Props = {}

const RequestWorkplaceDetail: NextPageWithLayout = (props: Props) => {
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})

    const router = useRouter()
    const { id } = router.query

    // query
    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })
    const workplace = useGetSubAdminStudentWorkplaceQuery(Number(id), {
        skip: !id,
    })

    useEffect(() => {
        if (
            workplace?.data &&
            workplace.isSuccess &&
            workplace?.data?.length > 0
        ) {
            if (workplace?.data[0]?.currentStatus === 'placementStarted')
                setActive(4)
            else setActive(3)
        }
        // else if (!workplace?.data?.length) {
        //     setActive(1)
        // }
    }, [workplace])

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

    return (
        <>
            <PageTitle
                title="Request Workplace Detial"
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
                                    />
                                )}

                                {active === 2 && (
                                    <Availability
                                        setActive={setActive}
                                        personalInfoData={personalInfoData}
                                        userId={data?.user?.id}
                                    />
                                )}

                                {(active === 3 || active === 4) && (
                                    <IndustrySelection
                                        setActive={setActive}
                                        workplace={workplace}
                                        userId={data?.user?.id}
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

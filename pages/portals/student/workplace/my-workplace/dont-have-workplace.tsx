import { ReactElement, useEffect, useState } from 'react'

import { LoadingAnimation, StepIndicator, TechnicalError } from '@components'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { useGetWorkplaceIndustriesQuery } from '@queries'
import {
    Availability,
    PersonalInfo,
    IndustrySelection,
} from '@partials/student/workplace'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

type Props = {}

const DontHaveWorkplace: NextPageWithLayout = (props: Props) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})

    // query
    const workplace = useGetWorkplaceIndustriesQuery()

    useEffect(() => {
        if (
            workplace.isSuccess &&
            workplace.data &&
            workplace.data?.length > 0
        ) {
            if (workplace.data?.currentStatus === 'placementStarted')
                setActive(4)
            else setActive(3)
        }
    }, [workplace.data, workplace.isSuccess])

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
            {workplace.isError && <TechnicalError />}
            {workplace.isLoading ? (
                <LoadingAnimation height={'h-[40vh]'} />
            ) : (
                !workplace.isError && (
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
                                <PersonalInfo
                                    setActive={setActive}
                                    setPersonalInfoData={setPersonalInfoData}
                                    personalInfoData={personalInfoData}
                                />
                            )}

                            {active === 2 && (
                                <Availability
                                    setActive={setActive}
                                    personalInfoData={personalInfoData}
                                />
                            )}

                            {(active === 3 || active === 4) && (
                                <IndustrySelection
                                    setActive={setActive}
                                    workplace={workplace}
                                />
                            )}
                        </div>
                    </div>
                )
            )}
        </>
    )
}
DontHaveWorkplace.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Workplace' }}>{page}</StudentLayout>
    )
}

export default DontHaveWorkplace

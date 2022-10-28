import { ReactElement, useState } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ActionAlert, ActionAlertType, Card, StepIndicator } from '@components'
import {
    Availability,
    IndustrySelection,
    PersonalInfo,
} from '@components/sections/student/WorkplaceContainer/MyWorkPlace'

type Props = {}

const MyWorkPlaces: NextPageWithLayout = (props: Props) => {
    const [active, setActive] = useState(1)
    const [personalInfoData, setPersonalInfoData] = useState({})
    const [workplaceIndustries, setWorkplaceIndustries] = useState(null)
    const [selectedCourses, setSelectedCourses] = useState<number[] | any>(null)

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
            label: 'Wait For Approval',
            visited: false,
            last: true,
        },
    ]

    return (
        <div className="flex gap-x-5 w-full">
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
                    <PersonalInfo
                        setActive={setActive}
                        setPersonalInfoData={setPersonalInfoData}
                    />
                )}

                {active === 2 && (
                    <Availability
                        setActive={setActive}
                        personalInfoData={personalInfoData}
                        setWorkplaceIndustries={setWorkplaceIndustries}
                        setSelectedCourses={setSelectedCourses}
                    />
                )}

                {active === 3 && (
                    <IndustrySelection
                        setActive={setActive}
                        workplaceIndustries={workplaceIndustries}
                        selectedCourses={selectedCourses}
                    />
                )}

                {active === 4 && (
                    <Card>
                        <ActionAlert
                            title={'Your Request Has Been Place Successfully!'}
                            description={
                                'This prompt should be shown, when some long or multiprocess has been completed, and now user need to return to home or some other page.'
                            }
                            variant={'primary' || 'info' || 'error'}
                            primaryAction={{
                                text: 'Call To Action',
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
MyWorkPlaces.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default MyWorkPlaces

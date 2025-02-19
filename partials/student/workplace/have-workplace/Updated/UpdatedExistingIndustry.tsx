import { Card, Typography } from '@components'
import { Industry } from '@types'
import { useState } from 'react'
import { WorkplaceProgress } from '../../components'
import { UpdatedExistingIndustryCard } from './UpdatedExistingIndustryCard'
import { UpdatedIndustryCourse } from './UpdatedIndustryCourse'

export const UpdatedExistingIndustry = ({
    industry,
    abn,
    setActive,
    student,
}: {
    student?: number
    setActive: any
    abn: string
    industry: Industry
}) => {
    const [selectedCourse, setselectedCourse] = useState<number | null>(null)
    

    return (
        <div className="flex flex-col gap-y-7">
            <Card noPadding>
                <div className="w-full ">
                    <div className="w-full py-7 border-b border-[#D9DBE9]">
                        <WorkplaceProgress
                            progressNumber={3}
                            activeNumber={2}
                        />
                    </div>

                    {/*  */}
                    <div className="w-full px-10 pt-5 pb-9">
                        <Typography
                            color="text-[#6F6C90]"
                            variant="h4"
                            bold
                            center
                        >
                            We found following Workplace
                        </Typography>
                        <Typography
                            color="text-[#6F6C90]"
                            variant="title"
                            center
                            normal
                        >
                            Result Found From Given ABN{' '}
                            <span className="font-semibold">{abn}</span>
                        </Typography>

                        {/*  */}
                        <div className="flex flex-col gap-y-3 gap-x-10 mt-5">
                            <div className="w-full max-w-lg mx-auto">
                                <UpdatedIndustryCourse
                                    setselectedCourse={setselectedCourse}
                                />

                                {/*  */}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Typography center medium>
                                    Workplace
                                </Typography>
                                <div className="flex flex-col gap-y-4">
                                    <UpdatedExistingIndustryCard
                                        industry={industry}
                                        selectedCourse={selectedCourse}
                                        setActive={setActive}
                                        student={student}
                                    />

                                    {industry?.locations?.map(
                                        (location: any) => (
                                            <UpdatedExistingIndustryCard
                                                industry={{
                                                    ...location,
                                                    id: industry?.id,
                                                    locationId: location?.id,
                                                    addressLine1:
                                                        location?.address,
                                                    user: industry?.user,
                                    
                                                }}
                                                branch
                                                selectedCourse={selectedCourse}
                                                setActive={setActive}
                                                student={student}
                                                // selectedCourse={Number(selectedCourse)}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="w-40 mx-auto"></div>
        </div>
    )
}

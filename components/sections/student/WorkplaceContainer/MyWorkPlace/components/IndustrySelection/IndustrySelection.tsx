import React, { useState } from 'react'

// components
import { Typography, Card } from 'components'
import { Button } from 'components'
import { VerifyStudentDocs } from '../VerifyStudentDocs'

export const IndustrySelection = ({
    setActive,
    selectedCourses,
    workplaceIndustries,
}: {
    setActive: Function
    selectedCourses: number[]
    workplaceIndustries: any
}) => {
    const [industrySelection, setIndustrySelection] = useState(null)
    return (
        <div>
            <Typography variant={'label'}>Select Industry</Typography>

            {/*  */}
            {!industrySelection ? (
                <Card>
                    <div className="my-4 flex flex-col gap-y-2">
                        {workplaceIndustries &&
                        workplaceIndustries.length > 0 ? (
                            <>
                                <Typography
                                    variant={'muted'}
                                    color={'secondaryText'}
                                >
                                    These are most suitable industries we have
                                    according to your given criteria.
                                </Typography>
                                {workplaceIndustries.map(
                                    (industry: any, i: number) => (
                                        <div
                                            key={i}
                                            className="bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center"
                                        >
                                            <div className="flex items-center gap-x-2">
                                                <img
                                                    src={`https://picsum.photos/100/10${i}`}
                                                    alt=""
                                                />
                                                <div>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={'gray'}
                                                    >
                                                        5km away
                                                    </Typography>
                                                    <Typography
                                                        variant={'label'}
                                                    >
                                                        {industry?.businessName}
                                                    </Typography>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={'gray'}
                                                    >
                                                        {industry?.addressLine1}
                                                        ,{' '}
                                                        {industry?.addressLine2}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Button
                                                variant={'secondary'}
                                                text={'Apply Here'}
                                                onClick={() => {
                                                    setIndustrySelection(
                                                        industry?.id
                                                    )
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            workplaceIndustries?.message && (
                                <Typography variant={'muted'} color={'gray'}>
                                    {workplaceIndustries?.message}
                                </Typography>
                            )
                        )}
                    </div>

                    <Button
                        variant={'secondary'}
                        text={'Cancel Request'}
                        onClick={() => {
                            setActive(1)
                        }}
                    />
                </Card>
            ) : (
                <VerifyStudentDocs
                    setActive={setActive}
                    setIndustrySelection={setIndustrySelection}
                    id={industrySelection}
                    selectedCourses={selectedCourses}
                />
            )}
        </div>
    )
}

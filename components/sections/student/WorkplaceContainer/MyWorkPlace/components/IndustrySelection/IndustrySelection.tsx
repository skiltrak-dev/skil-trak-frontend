import React, { useState } from 'react'

// components
import { Typography, Card } from 'components'
import { Button } from 'components'
import { VerifyStudentDocs } from '../VerifyStudentDocs'

export const IndustrySelection = ({ setActive }: { setActive: Function }) => {
    const [industrySelection, setIndustrySelection] = useState(true)
    return (
        <div>
            <Typography variant={'label'}>Select Industry</Typography>

            {/*  */}
            {industrySelection ? (
                <Card>
                    <Typography variant={'muted'} color={'secondaryText'}>
                        These are most suitable industries we have according to
                        your given criteria.
                    </Typography>

                    <div className="my-4 flex flex-col gap-y-2">
                        {[...Array(4)].map((_, i) => (
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
                                        <Typography variant={'label'}>
                                            Claro Aged Care and Disability
                                            Services
                                        </Typography>
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            28 Rainwater Dr Lyndhurst VIC 3975,
                                            Australia
                                        </Typography>
                                    </div>
                                </div>
                                <Button
                                    variant={'secondary'}
                                    text={'Apply Here'}
                                    onClick={() => {
                                        setIndustrySelection(false)
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        variant={'secondary'}
                        text={'Cancel Request'}
                        onClick={() => {
                            setActive((active: number) => active - 1)
                        }}
                    />
                </Card>
            ) : (
                <VerifyStudentDocs
                    setActive={setActive}
                    setIndustrySelection={setIndustrySelection}
                />
            )}
        </div>
    )
}

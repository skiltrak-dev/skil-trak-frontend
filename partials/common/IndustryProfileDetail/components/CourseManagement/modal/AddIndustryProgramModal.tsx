import { Button, LoadingAnimation, Modal, NoData } from '@components'
import { AdminApi } from '@queries'
import { Industry } from '@types'
import { useState } from 'react'
import { IndustryCourseProgramCard } from '../CourseCard'
import { AddIndustryCourseProgramForm } from '../form'

export const AddIndustryProgramModal = ({
    approval,
    industry,
    onCancel,
}: {
    approval: any
    industry: Industry
    onCancel: () => void
}) => {
    const [addProgram, setAddProgram] = useState(false)

    const industryProgram = AdminApi.Industries.industryCourseProgramsList({
        courseId: approval?.course?.id,
        industryId: industry?.id,
    })

    return (
        <div>
            <Modal
                title={'Industry Course Program'}
                subtitle={''}
                showActions={false}
                onCancelClick={onCancel}
            >
                <div className="max-h-[75vh] overflow-auto custom-scrollbar">
                    {industryProgram.isError && (
                        <NoData
                            simple
                            isError
                            text="There is some technical error!"
                        />
                    )}
                    {industryProgram.isLoading ? (
                        <LoadingAnimation size={70} />
                    ) : industryProgram?.isSuccess &&
                      industryProgram?.data &&
                      industryProgram?.data?.length &&
                      !addProgram ? (
                        <div className="space-y-2">
                            <div className="flex justify-end">
                                <Button
                                    text="Add"
                                    onClick={() => {
                                        setAddProgram(true)
                                    }}
                                />
                            </div>
                            {industryProgram?.data?.map((program) => (
                                <IndustryCourseProgramCard
                                    key={program?.id}
                                    program={program}
                                />
                            ))}
                        </div>
                    ) : (
                        industryProgram.isSuccess && (
                            <AddIndustryCourseProgramForm
                                onCancel={() => {
                                    setAddProgram(false)
                                }}
                                industry={industry}
                                course={approval?.course}
                            />
                        )
                    )}
                </div>
            </Modal>
        </div>
    )
}

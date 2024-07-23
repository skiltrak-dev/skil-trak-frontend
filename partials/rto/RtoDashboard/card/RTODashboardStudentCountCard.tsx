import { Card, Typography } from '@components'
import { LabelCard } from '@partials/admin'
import { ReactElement, useState } from 'react'
import { StudentLogsModal } from '../modals'

export const RTODashboardStudentCountCard = ({
    newAddedStudents,
}: {
    newAddedStudents: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onViewStudentLogs = () => {
        setModal(<StudentLogsModal onCancel={onCancelClicked} />)
    }
    return (
        <>
            {modal}
            <Card noPadding>
                <div className="px-3.5 py-3 flex flex-col gap-y-1 relative">
                    <LabelCard
                        right={16}
                        top={-20}
                        background={{
                            from: '#FF7300',
                            to: '#F7910F',
                        }}
                    />
                    <Typography variant="label" color="text-[#7B809A]" light>
                        New Added Students
                    </Typography>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-1.5">
                            <Typography variant="h3" bold>
                                {newAddedStudents}
                            </Typography>
                            <Typography
                                variant="xxs"
                                light
                                color="text-[#7B809A]"
                            >
                                Since last 30 days
                            </Typography>
                        </div>
                        <div
                            onClick={() => {
                                onViewStudentLogs()
                            }}
                        >
                            <Typography
                                underline
                                variant="small"
                                color="text-[#24556D]"
                                cursorPointer
                            >
                                View Student Logs
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

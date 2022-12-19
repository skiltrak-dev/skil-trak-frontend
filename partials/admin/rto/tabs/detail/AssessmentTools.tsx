import { TabNavigation, TabProps } from '@components'
import { useState } from 'react'
import { AssessmentTool, ArchivedAssessmentTool } from '../../components'

export const AssessmentTools = ({ rto }: any) => {
    const [assessmentView, setAssessmentView] = useState<string>('assessments')
    // const tabs: TabProps[] = [
    //     {
    //         label: 'Assessments',
    //         href: { query: { tab: 'assessments', id: rto?.data?.id } },
    //         element: <AssessmentTool rto={rto} />,
    //     },
    //     {
    //         label: 'Archived',
    //         href: {
    //             query: { tab: 'archived', id: rto?.data?.id },
    //         },
    //         element: <ArchivedAssessmentTool rto={rto} />,
    //     },
    // ]
    return (
        <>
            {assessmentView === 'assessments' ? (
                <AssessmentTool
                    rto={rto}
                    setAssessmentView={setAssessmentView}
                />
            ) : (
                <ArchivedAssessmentTool
                    rto={rto}
                    setAssessmentView={setAssessmentView}
                />
            )}
            {/* <TabNavigation tabs={tabs}>
                {({ element }: any) => {
                    return (
                        <div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation> */}
        </>
    )
}

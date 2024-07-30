import { useContextBar } from '@hooks'
import { Rto } from '@types'
import { getUserCredentials } from '@utils'
import { useEffect } from 'react'
import {
    RtoDashboardMap,
    RtoDashboardStatistics,
    RtoDashboardStudents,
    RtoImportantDocuments,
} from './component'
import { ProfileViewContextBar } from './ProfileViewContextBar'
export const RtoDashboard = ({ rto }: { rto: Rto }) => {
    const contextBar = useContextBar()
    useEffect(() => {
        contextBar.setContent(<ProfileViewContextBar rto={rto} />)
        contextBar.show(false)

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
            contextBar.setTitle('')
        }
    }, [rto])
    return (
        <div className="flex flex-col gap-y-8 mb-12">
            <div>
                <RtoDashboardStatistics rtoUserId={getUserCredentials()?.id} />
            </div>
            <div>
                <RtoDashboardStudents />
            </div>
            <div className="grid grid-cols-10 gap-x-4">
                <div className="flex flex-col col-span-7">
                    <div className="flex-grow">
                        <div className="h-full">
                            <RtoDashboardMap
                                address={`${rto?.addressLine1} ${rto?.suburb}}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col col-span-3">
                    <div className="flex-grow">
                        <RtoImportantDocuments
                            coureseRequirementsLink={
                                '/portals/rto/course-requirements'
                            }
                            rto={rto}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

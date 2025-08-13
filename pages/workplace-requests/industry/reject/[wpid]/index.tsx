import { Card } from '@components'
import { SiteLayout } from '@layouts'
import { useRouter } from 'next/router'
import { DeclineStudentFromInd } from '@partials/common/StudentProfileDetail/components'

const WorkplaceIndustryRejectComment = () => {
    const router = useRouter()
    return (
        <SiteLayout>
            <div className="max-w-5xl flex justify-center items-center mx-auto py-4 md:py-10 lg:py-12">
                <Card>
                    <DeclineStudentFromInd
                        workplaceId={Number(router?.query?.wpid)}
                        redirect
                    />
                </Card>
            </div>
        </SiteLayout>
    )
}

export default WorkplaceIndustryRejectComment

import { Card, Typography } from '@components'
import { InsuranceDocuments } from '@partials/rto'

export const InsuranceDocumentsData = ({ userId }: { userId: number }) => {
    return (
        <Card shadowType="profile" noPadding fullHeight>
            <div className="h-full pb-4">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Insurance Documents</span>
                    </Typography>
                </div>

                {/*  */}
                <div className="px-4 pt-4 flex flex-col gap-y-5 h-[calc(420px-72px)] overflow-auto custom-scrollbar">
                    <InsuranceDocuments rtoUser={userId} />
                </div>
            </div>
        </Card>
    )
}

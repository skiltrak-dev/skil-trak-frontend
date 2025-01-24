import { EmptyData, TechnicalError, Typography } from '@components'
import { MailListCard } from '../Cards'
import { MailLoadingSkeleton } from './MailLoadingSkeleton'

export const MailingList = ({
    sender,
    mailsList,
    onSelectMails,
    selectedMails,
}: {
    sender?: boolean
    selectedMails: any
    onSelectMails: (type: string, id?: number) => void
    mailsList: any
}) => {
    return (
        <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] h-screen custom-scrollbar overflow-y-auto">
            {mailsList.isError ? <TechnicalError /> : null}
            {mailsList?.isLoading || mailsList?.isFetching ? (
                <div className="flex flex-col gap-y-0">
                    {[...Array(10)].map((_, i) => (
                        <MailLoadingSkeleton key={i} />
                    ))}
                </div>
            ) : mailsList?.data?.data && mailsList?.data?.data?.length > 0 ? (
                mailsList?.data?.data?.map((mail: any) => (
                    <MailListCard
                        key={mail?.id}
                        mailDetail={mail}
                        user={sender ? mail?.receiver : mail?.sender}
                        // user={mail?.receiver}
                        onSelectMails={() => {
                            onSelectMails('single', mail?.id)
                        }}
                        selectedMail={selectedMails?.includes(mail?.id)}
                    />
                ))
            ) : (
                !mailsList?.isError && <EmptyData />
            )}
        </div>
    )
}

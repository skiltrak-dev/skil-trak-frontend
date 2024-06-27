import { EmptyData } from '@components'
import { MailListCard } from '../Cards'
import { MailLoadingSkeleton } from './MailLoadingSkeleton'

export const MailingList = ({
    mailsList,
    onSelectMails,
    selectedMails,
}: {
    selectedMails: any
    onSelectMails: (type: string, id?: number) => void
    mailsList: any
}) => {
    return (
        <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)]">
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
                        user={mail?.receiver}
                        onSelectMails={() => {
                            onSelectMails('single', mail?.id)
                        }}
                        selectedMail={selectedMails?.includes(mail?.id)}
                    />
                ))
            ) : mailsList?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}

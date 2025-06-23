import { useState } from 'react'
import { MailTitle, MailTopBar, MailingList } from './components'
import { CommonApi } from '@queries'
import { useFunctions } from '../hooks'
import { Typography } from '@components'

export const ReceiverMailsInbox = () => {
    const [itemPerPage, setItemPerPage] = useState(30)
    const [page, setPage] = useState(1)

    const mailsList = CommonApi.Messages.useUserMails({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
        type: 'receiver',
    })

    const { onSelectMails, selectedMails, onPageChange } = useFunctions(
        page,
        mailsList?.data,
        setPage
    )

    return (
        <div className="w-full">
            <MailTopBar
                hasNext={mailsList?.data?.pagination?.hasNext}
                hasPrev={page > 1}
                isSelectedMails={
                    selectedMails?.length === mailsList?.data?.data?.length
                }
                selectedMails={selectedMails}
                refetch={mailsList?.refetch}
                onPageChange={onPageChange}
                onSelectMails={onSelectMails}
                pagination={mailsList?.data?.pagination}
                setPage={setPage}
            />
            <MailTitle mailFrom={'From'} />
            <MailingList
                selectedMails={selectedMails}
                mailsList={mailsList}
                onSelectMails={onSelectMails}
            />
        </div>
    )
}

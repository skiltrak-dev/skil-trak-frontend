import { useState } from 'react'
import { MailTopBar, MailingList } from './components'
import { CommonApi } from '@queries'
import { useFunctions } from '../hooks'

export const SenderMailsInbox = () => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)

    const mailsList = CommonApi.Messages.useUserMails({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
        type: 'sender',
    })

    const { onSelectMails, selectedMails, onPageChange } = useFunctions(
        page,
        mailsList?.data,
        setPage
    )

    return (
        <div>
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
            />
            <MailingList
                sender
                selectedMails={selectedMails}
                mailsList={mailsList}
                onSelectMails={onSelectMails}
            />
        </div>
    )
}

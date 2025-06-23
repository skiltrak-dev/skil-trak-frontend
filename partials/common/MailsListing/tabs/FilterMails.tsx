import React, { useState } from 'react'
import { useFunctions } from './hooks'
import { MailListCard } from './MailsInbox/Cards'
import { MailingList, MailTopBar } from './MailsInbox'
import { CommonApi } from '@queries'
import { removeEmptyValues } from '@utils'

export const FilterMails = ({ query }: any) => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)

    const mailsList = CommonApi.Messages.useUserMails({
        search: `${JSON.stringify(
            removeEmptyValues({
                subject: query,
            })
        )
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { onSelectMails, selectedMails, onPageChange } = useFunctions(
        page,
        mailsList?.data,
        setPage
    )
    return (
        <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] h-screen custom-scrollbar overflow-y-auto">
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
            <MailingList
                selectedMails={selectedMails}
                mailsList={mailsList}
                onSelectMails={onSelectMails}
            />
        </div>
    )
}

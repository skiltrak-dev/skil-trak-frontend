import React, { useState } from 'react'
import { useFunctions } from './hooks'
import { MailListCard } from './MailsInbox/Cards'
import { MailingList, MailTopBar } from './MailsInbox'

export const FilterMails = ({ filteredData, query }: any) => {
    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)

    // const mailsList = CommonApi.Messages.useUserMails({
    //     skip: itemPerPage * page - itemPerPage,
    //     limit: itemPerPage,
    //     type: 'receiver',
    // })

    const { onSelectMails, selectedMails, onPageChange } = useFunctions(
        page,
        filteredData?.data,
        setPage
    )
    return (
        <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] h-[410px] custom-scrollbar overflow-y-auto">
            <MailTopBar
                hasNext={filteredData?.data?.pagination?.hasNext}
                hasPrev={page > 1}
                isSelectedMails={
                    selectedMails?.length === filteredData?.data?.data?.length
                }
                selectedMails={selectedMails}
                refetch={filteredData?.refetch}
                onPageChange={onPageChange}
                onSelectMails={onSelectMails}
                pagination={filteredData?.data?.pagination}
            />
            <MailingList
                selectedMails={selectedMails}
                mailsList={filteredData}
                onSelectMails={onSelectMails}
            />
        </div>
    )
}

import React, { useState } from 'react'

export const useFunctions = (
    page: number,
    mailsList: any,
    setPage: (page: number) => void
) => {
    const [selectedMails, setSelectedMails] = useState<number[]>([])

    const onlyMailsIds = (mails: any) => mails?.map((mail: any) => mail?.id)

    const onSelectMails = (type: string, id?: number) => {
        if (type === 'all') {
            setSelectedMails(
                selectedMails?.length === mailsList?.data?.length
                    ? []
                    : onlyMailsIds(mailsList?.data)
            )
        } else if (type === 'read') {
        } else if (type === 'unread') {
        } else if (type === 'single' && id) {
            setSelectedMails(
                selectedMails && selectedMails?.includes(id)
                    ? selectedMails?.filter((mails: any) => mails !== id)
                    : [...selectedMails, id]
            )
        }
    }

    const onPageChange = (type: string) => {
        if (type === 'prev' && page > 1) {
            setPage(page - 1)
        } else if (type === 'next' && mailsList?.pagination?.hasNext) {
            setPage(page + 1)
        }
    }
    return { onSelectMails, selectedMails, onPageChange }
}

import { ReactElement, useEffect } from 'react'

// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { BackButton, Button, draftToHtmlText } from '@components'
import { useNavbar } from '@hooks'
import { ReplyTicketForm } from '@partials/common/Tickets'
import {
    TicketDetailHeaderCard,
    TicketMessageCard,
} from '@partials/common/Tickets/components'
import { NextPageWithLayout } from '@types'

const TicketDetail: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Ticket Detail')
    }, [])

    const onSubmit = (values: any) => {
        const content = draftToHtmlText(values?.message)
        console.log('Saad', content)
    }

    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-4">
                <BackButton
                    text={'Tickets'}
                    link={'/portals/admin/tickets?tab=my-open-tickets'}
                />
                <Button text={'Close Ticket'} variant={'dark'} />
            </div>

            <div className="sticky top-2 z-50">
                <TicketDetailHeaderCard />
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
                {[...Array(10)].map((_, i) => (
                    <TicketMessageCard key={i} i={i} />
                ))}
            </div>

            <div className="mt-2 fixed bottom-0 w-[calc(100%-95px)]">
                <ReplyTicketForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

TicketDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default TicketDetail

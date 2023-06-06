import { ReactElement, useEffect } from 'react'

// Layouts
import { AdminLayout } from '@layouts'
// Types
import {
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    draftToHtmlText,
} from '@components'
import { useNavbar } from '@hooks'
import { ReplyTicketForm } from '@partials/common/Tickets'
import {
    TicketDetailHeaderCard,
    TicketMessageCard,
} from '@partials/common/Tickets/components'
import { NextPageWithLayout } from '@types'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'

const Tickets: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()
    const router = useRouter()

    const [closeTicket, closeTicketResult] = AdminApi.Tickets.useCloseTicket()
    const ticketDetail = AdminApi.Tickets.useGetDetail(
        Number(router.query.detail),
        {
            skip: !router.query.detail,
        }
    )

    useEffect(() => {
        setTitle('Ticket Detail')
    }, [])

    const onSubmit = (values: any) => {
        const content = draftToHtmlText(values?.message)
        console.log('Saad', content)
    }

    return (
        <>
            <ShowErrorNotifications result={closeTicketResult} />
            <div className="px-4">
                <div className="flex items-center justify-between mb-4">
                    <BackButton
                        text={'Tickets'}
                        link={'/portals/admin/tickets?tab=my-open-tickets'}
                    />
                    {ticketDetail.isSuccess && (
                        <Button
                            text={'Close Ticket'}
                            variant={'dark'}
                            onClick={() => {
                                closeTicket(router?.query?.detail)
                            }}
                            loading={closeTicketResult.isLoading}
                            disabled={closeTicketResult.isLoading}
                        />
                    )}
                </div>

                {ticketDetail.isLoading ? (
                    <LoadingAnimation />
                ) : ticketDetail?.data ? (
                    <>
                        <div className="sticky top-1 z-50">
                            <TicketDetailHeaderCard />
                        </div>

                        <div className="flex flex-col gap-y-4 mt-4">
                            {[...Array(10)].map((_, i) => (
                                <TicketMessageCard key={i} i={i} />
                            ))}
                        </div>

                        <div className="mt-2 fixed bottom-0 w-[calc(100%-255px)]">
                            <ReplyTicketForm onSubmit={onSubmit} />
                        </div>
                    </>
                ) : (
                    <EmptyData />
                )}
            </div>
        </>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets

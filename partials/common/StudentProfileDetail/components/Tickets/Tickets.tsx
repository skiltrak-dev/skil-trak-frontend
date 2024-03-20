import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { TicketCard } from './Card'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'

export const Tickets = ({ studentId }: { studentId: number }) => {
    const tickets = CommonApi.Tickets.useStudentTicketsList(studentId, {
        refetchOnMountOrArgChange: true,
    })

    const router = useRouter()

    const role = getUserCredentials()?.role

    return (
        <Card noPadding fullHeight>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    Tickets
                </Typography>
                <Button
                    onClick={() => {
                        role === UserRoles.ADMIN
                            ? router.push('/portals/admin/tickets/add-ticket')
                            : role === UserRoles.SUBADMIN
                            ? router.push(
                                  '/portals/sub-admin/tickets/add-ticket'
                              )
                            : role === UserRoles.RTO
                            ? router.push('/portals/rto/tickets/add-ticket')
                            : ''
                    }}
                >
                    Create Ticket
                </Button>
            </div>

            <div className="px-4">
                <div className="py-2.5 flex justify-end">
                    {tickets?.data?.data?.length > 0 && (
                        <Typography variant="small" medium>
                            {tickets?.data?.data?.length} Record Found
                        </Typography>
                    )}
                </div>

                <div className="h-[385px] custom-scrollbar overflow-auto">
                    {tickets.isError ? (
                        <TechnicalError
                            description={false}
                            height={'50vh'}
                            imageUrl={'/images/icons/common/ticketError.png'}
                        />
                    ) : null}
                    <div className="flex flex-col gap-y-3">
                        {tickets.isLoading ? (
                            <div className="flex flex-col items-center justify-center h-60">
                                <LoadingAnimation size={60} />
                                <Typography variant="label">
                                    Tickets Loading...
                                </Typography>
                            </div>
                        ) : tickets?.data?.data &&
                          tickets?.data?.data?.length > 0 ? (
                            tickets?.data?.data?.map((ticket: any) => (
                                <TicketCard key={ticket?.id} ticket={ticket} />
                            ))
                        ) : (
                            tickets?.isSuccess && (
                                <EmptyData
                                    imageUrl={'/images/ticketIcon.png'}
                                    title="No Tickets Found"
                                    description="No Tickets were Found"
                                    height="40vh"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}

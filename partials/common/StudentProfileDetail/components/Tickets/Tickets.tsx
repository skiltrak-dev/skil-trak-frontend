import { Button, Card, LoadingAnimation, Typography } from '@components'
import { CommonApi } from '@queries'
import { TicketCard } from './Card'

export const Tickets = ({ studentId }: { studentId: number }) => {
    const tickets = CommonApi.Tickets.useStudentTicketsList(studentId, {
        refetchOnMountOrArgChange: true,
    })
    return (
        <Card noPadding>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    Tickets
                </Typography>
                <Button>Create Ticket</Button>
            </div>

            <div className="px-4">
                <div className="py-2.5 flex justify-end">
                    {tickets?.data?.data?.length > 0 && (
                        <Typography variant="small" medium>
                            {tickets?.data?.data?.length} Record Found
                        </Typography>
                    )}
                </div>

                <div className="h-[350px] custom-scrollbar overflow-auto">
                    <div className="flex flex-col gap-y-3">
                        {tickets.isLoading ? (
                            <div className="flex flex-col items-center justify-center h-60">
                                <LoadingAnimation size={60} />
                                <Typography variant="label">
                                    Tickets Loading...
                                </Typography>
                            </div>
                        ) : (
                            tickets?.data?.data?.map((ticket: any) => (
                                <TicketCard key={ticket?.id} ticket={ticket} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}

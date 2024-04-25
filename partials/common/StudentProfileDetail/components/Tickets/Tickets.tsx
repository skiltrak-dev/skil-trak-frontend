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
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const Tickets = ({ studentId }: { studentId: number }) => {
    const [isEntered, setIsEntered] = useState<boolean>(false)
    const tickets = CommonApi.Tickets.useStudentTicketsList(studentId, {
        skip: !isEntered,
        refetchOnMountOrArgChange: true,
    })

    const router = useRouter()

    const role = getUserCredentials()?.role

    return (
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
            onLeave={() => {
                setIsEntered(false)
            }}
        >
            <div className="!h-full">
                <Card noPadding fullHeight>
                    <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                        <Typography variant="label" semibold>
                            Tickets
                        </Typography>
                        <Button
                            onClick={() => {
                                role === UserRoles.ADMIN
                                    ? router.push({
                                          pathname:
                                              '/portals/admin/tickets/add-ticket',
                                          query: { student: studentId },
                                      })
                                    : role === UserRoles.SUBADMIN
                                    ? router.push({
                                          pathname:
                                              '/portals/sub-admin/tickets/add-ticket',
                                          query: { student: studentId },
                                      })
                                    : role === UserRoles.RTO
                                    ? router.push({
                                          pathname:
                                              '/portals/rto/tickets/add-ticket',
                                          query: { student: studentId },
                                      })
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

                        <div className="h-[calc(600px-120px)] custom-scrollbar overflow-auto">
                            {tickets.isError ? (
                                <TechnicalError
                                    description={false}
                                    height={'50vh'}
                                    imageUrl={
                                        '/images/icons/common/ticketError.png'
                                    }
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
                                        <TicketCard
                                            key={ticket?.id}
                                            ticket={ticket}
                                        />
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
            </div>
        </Waypoint>
    )
}

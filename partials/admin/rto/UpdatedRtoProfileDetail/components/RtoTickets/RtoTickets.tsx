import {
    Button,
    EmptyData,
    GlobalModal,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { TicketCard } from '@partials/common/StudentProfileDetail/components/Tickets/Card'
import { CommonApi } from '@queries'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

export const RtoTickets = ({ onCancel }: { onCancel: () => void }) => {
    const tickets = CommonApi.Tickets.useStudentTicketsList(285, {
        refetchOnMountOrArgChange: true,
    })
    return (
        <GlobalModal>
            <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                <Typography variant="label" semibold>
                    Tickets
                </Typography>
                <FaTimes
                    onClick={onCancel}
                    className="transition-all duration-500 text-2xl cursor-pointer hover:rotate-90"
                />
            </div>
            <div className="px-4">
                <div className="py-2.5 flex justify-between items-center">
                    {tickets?.data?.data?.length > 0 && (
                        <Typography variant="small" medium>
                            {tickets?.data?.data?.length} Record Found
                        </Typography>
                    )}
                    {/* <Button
                    onClick={() => {
                        role === UserRoles.ADMIN
                            ? router.push({
                                  pathname: '/portals/admin/tickets/add-ticket',
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
                                  pathname: '/portals/rto/tickets/add-ticket',
                                  query: { student: studentId },
                              })
                            : ''
                    }}
                    >
                        Create Ticket
                    </Button> */}
                </div>

                <div className="h-[95vh] lg:h-[calc(500px-120px)] custom-scrollbar overflow-auto">
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
                            [
                                ...tickets?.data?.data,
                                ...tickets?.data?.data,
                                ...tickets?.data?.data,
                                ...tickets?.data?.data,
                                ...tickets?.data?.data,
                            ]?.map((ticket: any) => (
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
        </GlobalModal>
    )
}

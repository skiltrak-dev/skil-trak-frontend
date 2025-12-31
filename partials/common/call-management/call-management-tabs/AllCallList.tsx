import React, { useState } from 'react'
import { Call } from '../components'
import { CallCard } from '../components/cards'
import { mockCalls } from '../data'
import { CommonApi } from '@queries'
import { PageSize, Pagination } from '@components'

export const AllCallList = ({ setSelectedCall, handleCreateTicket }: any) => {
    // ai-voice-calls/summaries/list
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [calls, setCalls] = useState<Call[]>(mockCalls)
    const { data } = CommonApi.CallManagement.useAllAiCallList({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const handleMarkCompleted = (callId: string) => {
        setCalls((prevCalls) =>
            prevCalls.map((call) =>
                call.id === callId
                    ? { ...call, isCompleted: !call.isCompleted }
                    : call
            )
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden !p-4">
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={data?.data?.length}
                />
                <Pagination pagination={data?.pagination} setPage={setPage} />
            </div>
            {data?.data?.map((call: any, index: any) => {
                const isCompleted = call?.status
                const hasTicket = call?.hasTicket
                return (
                    <CallCard
                        call={call}
                        index={index}
                        onCallSelect={setSelectedCall}
                        onMarkCompleted={handleMarkCompleted}
                        onCreateTicket={handleCreateTicket}
                        isCompleted={isCompleted}
                        hasTicket={hasTicket}
                    />
                )
            })}
        </div>
    )
}

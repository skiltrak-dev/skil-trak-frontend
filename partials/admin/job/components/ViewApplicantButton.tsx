import { ActionButton, Typography } from '@components'
import { useRouter } from 'next/router'
import React from 'react'

export const ViewApplicantButton = ({
    id,
    applicationCount,
}: {
    id: number
    applicationCount: number
}) => {
    const router = useRouter()
    return (
        <div className="relative">
            <ActionButton
                variant="link"
                simple
                onClick={() => {
                    router.push(`/portals/admin/jobs/${id}`)
                }}
            >
                View
            </ActionButton>
            <div className="absolute -top-2 right-2 bg-success w-4 h-4 rounded-full flex justify-center items-center">
                <Typography variant="xs" color="text-white" medium>
                    {applicationCount}
                </Typography>
            </div>
        </div>
    )
}

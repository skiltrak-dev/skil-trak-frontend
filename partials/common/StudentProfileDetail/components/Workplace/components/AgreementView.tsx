import { Typography } from '@components'
import { useContextBar } from '@hooks'
import { ViewAgreement } from '@partials/common/ViewAgreement'
import React from 'react'

export const AgreementView = ({ workplace }: { workplace: any }) => {
    const { setContent, show } = useContextBar()

    return (
        <div
            onClick={() => {
                setContent(<ViewAgreement workplace={workplace} />)
                show(false)
            }}
        >
            <Typography variant={'small'} color={'text-info'} semibold>
                <span className="cursor-pointer">View Agreement</span>
            </Typography>
        </div>
    )
}

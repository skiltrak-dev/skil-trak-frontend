import { ActionButton, Badge, Tooltip, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import React, { ReactElement, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { ApproveKpiModal, RejectKpiModal } from '../modal'

export const useColumnsAction = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onApproveKpi = (kpi: any) => {
        setModal(<ApproveKpiModal onCancel={onCancelClicked} kpi={kpi} />)
    }
    const onRejectKpi = (kpi: any) => {
        setModal(<RejectKpiModal onCancel={onCancelClicked} kpi={kpi} />)
    }
    const columnAction: ColumnDef<any>[] = [
        {
            accessorKey: 'action',
            header: 'Action',
            cell: (info) => (
                <>
                    {info?.row?.original?.isVerified ? (
                        <Badge text="Kpi Verified" />
                    ) : (
                        <div className="flex items-center gap-x-2">
                            <div className="relative group">
                                <ActionButton
                                    Icon={FaCheck}
                                    variant="success"
                                    onClick={() =>
                                        onApproveKpi(info?.row?.original)
                                    }
                                />
                                <Tooltip>Verify Kpi</Tooltip>
                            </div>
                            {/* <ActionButton
                    Icon={FaTimes}
                    variant="error"
                    onClick={onRejectKpi}
                /> */}
                        </div>
                    )}
                </>
            ),
        },
    ]
    return { columnAction, modal }
}

import React, { ReactElement, useState } from 'react'
import { MdViewQuilt } from 'react-icons/md'
import { ReportListModal } from '../components/ReportListModal'

type Props = {
    data: any
    columns: any
}

export const ViewFullListReport = ({
    data,
    columns,
}: Props) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onClose = () => {
        setModal(null)
    }
    const onViewClicked = () => {
        setModal(<ReportListModal columns={columns} data={data} onClose={() => onClose()} />)
    }
    return (
        <>
            {modal && modal}
            <div
                onClick={() => {
                    onViewClicked()
                }}
                className="bg-gray-100 cursor-pointer rounded p-2 flex items-center gap-x-2"
            >
                <MdViewQuilt size={20} className="text-gray-400" />
                <span>VIEW FULL LIST</span>
            </div>
        </>
    )
}

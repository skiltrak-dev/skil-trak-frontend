import { Card } from '@components/cards'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { PuffLoader } from 'react-spinners'
import { DeleteInsuranceTypeModal, EditTypeInsuaranceModal } from '../modal'

interface Href {
    pathname?: string
    query: any
}

interface TabVIIProps {
    index: number
    label: string
    active: boolean
    loading?: boolean
    count?: number
    onClick: () => void
    id: number
}

export const DocumentTypeCard = ({
    id,
    label,
    active,
    onClick,
    loading,
    count,
    index,
}: TabVIIProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const iconBgColor = [
        'bg-gradient-to-b from-[#286788] to-[#3A99CA]',
        'bg-gradient-to-b from-[#60A5FA] to-[#338EFF]',
        'bg-gradient-to-b from-[#E93B77] to-[#DA1F63]',
        'bg-gradient-to-b from-[#EECF7B] to-[#C89E2D]',
    ]

    const onCancel = () => setModal(null)

    const onEditType = () => {
        setModal(
            <EditTypeInsuaranceModal onCancel={onCancel} data={label} id={id} />
        )
    }

    const onRemoveType = () => {
        setModal(
            <DeleteInsuranceTypeModal
                onCancel={onCancel}
                insuranceType={{ title: label, id }}
            />
        )
    }

    return (
        <>
            {modal}
            <div
                onClick={onClick}
                className={`cursor-pointer w-full ${
                    active ? 'border-blue-500 border rounded-lg' : ''
                }`}
            >
                <Card>
                    <div className="flex justify-end relative group">
                        <div className="hidden group-hover:block absolute -bottom-1 left-0 transition-all">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-info p-1 rounded-md"
                                    onClick={onEditType}
                                >
                                    <BiSolidPencil
                                        className="text-white"
                                        size={13}
                                    />
                                </div>
                                <div
                                    className="bg-error p-1 rounded-md"
                                    onClick={onRemoveType}
                                >
                                    <MdDelete
                                        className="text-white"
                                        size={13}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`absolute bottom-8 p-2 rounded-[10px] left-0 flex items-center gap-x-2 justify-between ${
                                iconBgColor?.[index % iconBgColor?.length || 0]
                            }`}
                        >
                            <Image
                                src={`/images/documents/document-text.png`}
                                alt={'document-text'}
                                width={21}
                                height={21}
                            />
                        </div>

                        <div className="flex flex-col items-end gap-y-0.5">
                            <p className="text-xs text-gray-500 leading-3 uppercase">
                                {label || ''}
                            </p>
                            {loading ? (
                                <div className="h-[36px]">
                                    <PuffLoader size={28} />
                                </div>
                            ) : (
                                <p className="text-3xl font-bold">
                                    {/* <CountUp end={count} /> */}
                                    {count || 0}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

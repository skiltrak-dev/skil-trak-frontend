import { Card, GlobalModal, Typography } from '@components'
import { IoIosWarning } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { WorkplaceRequestWarningEnum } from '../enum'

export const ShowPlacementCommentsModal = ({
    warnings,
    onCancel,
}: {
    warnings: any
    onCancel: () => void
}) => {
    const notes = (type: WorkplaceRequestWarningEnum) =>
        warnings?.filter((w: any) => w?.type === type)

    const outSide20Km = notes(
        WorkplaceRequestWarningEnum.OutSideRadiusPlacement
    )
    const rtoDocsMisMatch = notes(WorkplaceRequestWarningEnum.DocMissMatch)

    const notesComments = {
        'Placement Outside 20 Km Comment': outSide20Km,
        'Rto Documents Mismatch Comment': rtoDocsMisMatch,
    }

    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 h-[70vh] lg:h-auto lg:max-h-[400px] xl:max-h-[500px] 2xl:max-h-[550px] overflow-auto custom-scrollbar">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-32">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <IoIosWarning size={65} className="text-primary" />
                    </div>
                    {Object.entries(notesComments)?.map(
                        ([key, value]) =>
                            value &&
                            value?.length > 0 && (
                                <div className="mx-auto mt-3 flex flex-col gap-y-2">
                                    <Typography
                                        variant="subtitle"
                                        center
                                        semibold
                                    >
                                        {key}
                                    </Typography>
                                    <Card border>
                                        {value?.map((w: any) => (
                                            <div className="border-b py-1">
                                                {' '}
                                                <Typography
                                                    variant="small"
                                                    center
                                                >
                                                    {w?.comment}
                                                </Typography>
                                            </div>
                                        ))}
                                    </Card>
                                </div>
                            )
                    )}
                </div>
            </div>
        </GlobalModal>
    )
}

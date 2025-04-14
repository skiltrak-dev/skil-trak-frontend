import { Modal, WorkplaceAvatar } from '@components'
import { maskText } from '@utils'
import { FaMapMarkerAlt } from 'react-icons/fa'

export const ViewContactPersonDetail = ({
    onCancel,
    appliedIndustry,
}: {
    onCancel: () => void
    appliedIndustry: any
}) => {
    return (
        <Modal
            title={'Contact Person'}
            subtitle=""
            showActions={false}
            onCancelClick={onCancel}
        >
            <div>
                <div className="flex gap-x-6 mb-4">
                    <div className="flex-shrink-0">
                        <WorkplaceAvatar
                            imageUrl={appliedIndustry?.industry?.user?.avatar}
                        />
                    </div>
                    <div>
                        <div>
                            <div className="flex justify-between items-center gap-x-2 mt-0.5">
                                <p className="font-medium text-sm 2xl:text-base">
                                    {appliedIndustry?.industry?.user?.name}
                                </p>
                            </div>
                            <p className="text-slate-400 text-xs 2xl:text-sm">
                                {maskText(
                                    appliedIndustry?.industry?.user?.email
                                )}
                            </p>
                        </div>
                        <div>
                            <div className="flex gap-x-3 mt-1 border-t pt-2">
                                <div className="flex items-center gap-x-1">
                                    <span className="text-gray-400">
                                        <FaMapMarkerAlt size={14} />
                                    </span>
                                    <span className="text-[11px] 2xl:text-xs">
                                        {
                                            appliedIndustry?.industry
                                                ?.addressLine1
                                        }
                                        ,{' '}
                                        {/* {
                                            appliedIndustry?.industry
                                                ?.addressLine2
                                        } */}
                                        {/* , {appliedIndustry?.industry?.state},{' '}
                                        {appliedIndustry?.industry?.suburb}{' '} */}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2">
                                <p className="text-[13px] 2xl:text-[11px] text-gray-400">
                                    Contact Person
                                </p>
                                <div className="flex justify-between gap-x-4">
                                    <div>
                                        <p className="font-medium text-xs 2xl:text-base">
                                            {maskText(
                                                appliedIndustry?.industry
                                                    ?.contactPerson
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

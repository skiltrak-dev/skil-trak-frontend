import { GlobalModal, Typography } from '@components'
import { InsuranceDocuments } from '@partials/rto'
import { User } from '@types'
import { MdCancel } from 'react-icons/md'

export const RtoInsuranceDocModal = ({
    rtoUser,
    onCancel,
}: {
    rtoUser: User
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-4xl w-full px-5 py-6 relative flex flex-col gap-y-2 h-[70vh] lg:h-auto lg:max-h-[400px] xl:max-h-[500px] 2xl:max-h-[550px] overflow-auto custom-scrollbar">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="w-full">
                    <div className="w-full flex flex-col gap-y-3.5 justify-between items-center">
                        <div className="w-full mx-auto">
                            <Typography variant="h4" center semibold>
                                RTO Insurance Document
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2 max-w-3xl lg:w-[800px]">
                        <InsuranceDocuments
                            rtoUser={rtoUser?.id}
                            studentProfile
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}

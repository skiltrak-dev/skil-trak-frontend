import {
    Typography,
    GlobalModal,
    PermissionCard,
    ShowErrorNotifications,
} from '@components'
import { Rto, SubAdmin } from '@types'
import { MdCancel } from 'react-icons/md'
import { usePermissionData } from '../hooks'

export const AllowPermissionModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { permissions, responses, modal } = usePermissionData(rto)

    return (
        <>
            {modal}
            {responses?.map((res: any, i: number) => (
                <ShowErrorNotifications key={i} result={res} />
            ))}

            <GlobalModal className="!max-h-[70vh] overflow-auto">
                <div className="relative bg-white rounded-2xl">
                    <MdCancel
                        onClick={onCancel}
                        className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />

                    <div>
                        <div className="mx-auto w-fit py-3.5">
                            <Typography variant="label" bold center>
                                Permissions for {rto?.user?.name}
                            </Typography>
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-2 px-5 pb-5 overflow-auto custom-scrollbar">
                            {permissions?.map((permission: any, i: number) => (
                                <PermissionCard
                                    key={i}
                                    permission={permission}
                                    onCancel={onCancel}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}

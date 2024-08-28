import {
    GlobalModal,
    PermissionCard,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { SubAdmin } from '@types'
import { MdCancel } from 'react-icons/md'
import { usePermissionData } from '../hooks'

export const AllowPermissionModal = ({
    subadmin,
    onCancel,
}: {
    subadmin: SubAdmin
    onCancel: () => void
}) => {
    const { permissions, responses } = usePermissionData(subadmin)

    return (
        <>
            {responses?.map((res: any, i: number) => (
                <ShowErrorNotifications key={i} result={res} />
            ))}

            <GlobalModal>
                <div className="relative bg-white rounded-2xl">
                    <MdCancel
                        onClick={onCancel}
                        className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />

                    <div>
                        <div className="mx-auto w-fit py-3.5">
                            <Typography variant="label" bold center>
                                Permissions for {subadmin?.user?.name}
                            </Typography>
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-2 px-5 pb-5 h-[70vh] lg:h-[400px] xl:h-[450px] overflow-auto custom-scrollbar">
                            {permissions?.map((permission: any, i: number) => (
                                <PermissionCard
                                    key={i}
                                    permission={permission}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}

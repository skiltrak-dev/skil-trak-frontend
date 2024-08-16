import {
    Typography,
    GlobalModal,
    PermissionCard,
    ShowErrorNotifications,
} from '@components'
import { SubAdmin } from '@types'
import { FaSchool } from 'react-icons/fa'
import {
    MdAdminPanelSettings,
    MdCancel,
    MdOutlineAssignmentReturn,
} from 'react-icons/md'
import { usePermission } from '../hooks'

export const AllowPermissionModal = ({
    subadmin,
    onCancel,
}: {
    subadmin: SubAdmin
    onCancel: () => void
}) => {
    const {
        result,
        allowRtoListingResult,
        allowIndustryListingResult,
        resultCanAdmin,
        canLoginResult,
        allowPlacementResult,
        allowWpCancelationReqResult,
        resultAutoAssignWorkplace,
        onAllowRtoListingClicked,
        onAllowIndustryListingClicked,
        onAllowAsAdminClicked,
        onAllowLoginClicked,
        onAllowPlacementClicked,
        onAllowWpCancelationClicked,
        onAutoAssignClicked,
    } = usePermission()

    const permissions = [
        {
            text: 'Allow Rto Listing',
            onClick: () => onAllowRtoListingClicked(subadmin),
            toggle: subadmin?.allowRtoListing,
            isLoading: allowRtoListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Industry Listing',
            onClick: () => onAllowIndustryListingClicked(subadmin),
            toggle: subadmin?.allowIndustryListing,
            isLoading: allowIndustryListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow as Admin',
            onClick: () => onAllowAsAdminClicked(subadmin),
            toggle: subadmin?.canAdmin,
            isLoading: resultCanAdmin.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Login',
            onClick: () => onAllowLoginClicked(subadmin),
            toggle: subadmin?.user?.after_hours_access,
            isLoading: canLoginResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Student on Placement',
            onClick: () => onAllowPlacementClicked(subadmin),
            toggle: subadmin?.removeOnPlacementStart,
            isLoading: allowPlacementResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Cancelation Workplace',
            onClick: () => onAllowWpCancelationClicked(subadmin),
            toggle: subadmin?.canCancelWorkPlaceRequest,
            isLoading: allowWpCancelationReqResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Auto Assignment',
            onClick: () => onAutoAssignClicked(subadmin),
            toggle: subadmin?.allowAutoAssignment,
            isLoading: resultAutoAssignWorkplace.isLoading,
            Icon: MdOutlineAssignmentReturn,
        },
    ]
    return (
        <>
            <ShowErrorNotifications result={result} />
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
                        <div className="flex flex-col gap-y-2.5 px-5 pb-5">
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

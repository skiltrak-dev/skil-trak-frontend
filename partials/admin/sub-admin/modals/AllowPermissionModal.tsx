import {
    GlobalModal,
    ShowErrorNotifications,
    Switch,
    Typography,
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
            onClick: (subAdmin: SubAdmin) => onAllowRtoListingClicked(subAdmin),
            toggle: subadmin?.allowRtoListing,
            isLoading: allowRtoListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow Industry Listing',
            onClick: (subAdmin: SubAdmin) =>
                onAllowIndustryListingClicked(subAdmin),
            toggle: subadmin?.allowIndustryListing,
            isLoading: allowIndustryListingResult.isLoading,
            Icon: FaSchool,
        },
        {
            text: 'Allow as Admin',
            onClick: (subAdmin: SubAdmin) => onAllowAsAdminClicked(subAdmin),
            toggle: subadmin?.canAdmin,
            isLoading: resultCanAdmin.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Login',
            onClick: (subAdmin: SubAdmin) => onAllowLoginClicked(subAdmin),
            toggle: subadmin?.user?.after_hours_access,
            isLoading: canLoginResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Student on Placement',
            onClick: (subAdmin: SubAdmin) => onAllowPlacementClicked(subAdmin),
            toggle: subadmin?.removeOnPlacementStart,
            isLoading: allowPlacementResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Cancelation Workplace',
            onClick: (subAdmin: SubAdmin) =>
                onAllowWpCancelationClicked(subAdmin),
            toggle: subadmin?.canCancelWorkPlaceRequest,
            isLoading: allowWpCancelationReqResult.isLoading,
            Icon: MdAdminPanelSettings,
        },
        {
            text: 'Allow Auto Assignment',
            onClick: (subAdmin: SubAdmin) => onAutoAssignClicked(subAdmin),
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
                            {permissions?.map((permission: any) => (
                                <div className="flex items-center justify-between px-3 py-2 rounded-md border border-[#6B728060]">
                                    <Typography variant="xs" medium>
                                        {permission?.text}
                                    </Typography>
                                    <div className="flex items-center gap-x-3.5">
                                        <Typography variant="small" normal>
                                            No
                                        </Typography>

                                        <Switch
                                            name="priority"
                                            customStyleClass={'profileSwitch'}
                                            onChange={() => {
                                                permission?.onClick(subadmin)
                                            }}
                                            defaultChecked={permission?.toggle}
                                            value={permission?.toggle}
                                            loading={permission?.isLoading}
                                            disabled={permission?.isLoading}
                                        />

                                        <Typography variant="small" normal>
                                            Yes
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}

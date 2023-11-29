import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdAdminPanelSettings, MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { UserRoles } from '@constants'
import { LogoutType, useContextBar, useJoyRide } from '@hooks'
import {
    commonApi,
    CommonApi,
    industryApi,
    rtoApi,
    studentApi,
    subAdminApi,
    SubAdminApi,
} from '@queries'
import { ReactElement, useEffect, useState } from 'react'
import { SwitchToAdminModal } from '../SwitchToAdminModal'

export const ProfileOptionsDropDown = ({
    expanded,
    setExpanded,
}: {
    expanded: boolean
    setExpanded: Function
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const dispatch = useDispatch()

    // Modal
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onSwitchToAdminModalClicked = (subAdmin: any) => {
        setModal(
            <SwitchToAdminModal
                subAdmin={data}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const router = useRouter()
    const role = getUserCredentials()?.role
    const contextBar = useContextBar()
    //  EDIT PROFILE JOY RIDE
    const joyride = useJoyRide()
    const { data, isSuccess, isLoading, isFetching } =
        SubAdminApi.SubAdmin.useProfile()
    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()
    const [switchUserRole, resultSwitchUserRole] =
        CommonApi.Impersonation.useImpersonationToggle()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 0 })
            }, 1200)
        }
    }, [])
    const user = getUserCredentials()

    useEffect(() => {
        if (resultSwitchUserRole?.isSuccess) {
            router.push('/portals/admin')
        }
    }, [resultSwitchUserRole?.isSuccess])

    //  EDIT PROFILE JOY RIDE

    return (
        <>
        {modal && modal}
            <div
                className={`absolute top-14 overflow-scroll right-0 z-40 bg-white w-48 transition-all rounded-lg remove-scrollbar ${
                    !expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
                } `}
            >
                <ul>
                    <li
                        id="edit-profile"
                        onClick={() => {
                            router.push(
                                `/portals/${
                                    role === UserRoles.SUBADMIN
                                        ? 'sub-admin'
                                        : role
                                }/my-profile`
                            )
                            setExpanded(false)
                        }}
                        className="flex items-center gap-x-4 px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                    >
                        <span className="text-gray-400">
                            <FaRegAddressCard />
                        </span>
                        <p className="text-sm text-gray-600 font-medium">
                            Profile
                        </p>
                    </li>
                    {data?.canAdmin && (
                        <li
                            onClick={() => {
                                // switchUserRole()
                                onSwitchToAdminModalClicked(data)
                                // router.push('/portals/admin')
                                setExpanded(false)
                            }}
                            className="flex items-center gap-x-4 px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="text-gray-400">
                                <MdAdminPanelSettings />
                            </span>
                            <p className="text-sm text-gray-600 font-medium">
                                Switch to Admin
                            </p>
                        </li>
                    )}

                    <li
                        onClick={async () => {
                            if (AuthUtils.getToken()) {
                                await logoutActivity({})
                            }
                            AuthUtils.logout(router)
                            contextBar.setContent(null)
                            contextBar.setTitle(null)
                            contextBar.hide()
                            dispatch(subAdminApi.util.resetApiState())
                            dispatch(rtoApi.util.resetApiState())
                            dispatch(industryApi.util.resetApiState())
                            dispatch(commonApi.util.resetApiState())
                            dispatch(studentApi.util.resetApiState())
                        }}
                        className="flex items-center gap-x-4 px-4 py-2 hover:bg-red-100 cursor-pointer group"
                    >
                        <span className="text-red-300 group-hover:text-red-500">
                            <MdLogout />
                        </span>
                        <p className="text-sm text-red-400 group-hover:text-red-500 font-medium">
                            Log Out
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

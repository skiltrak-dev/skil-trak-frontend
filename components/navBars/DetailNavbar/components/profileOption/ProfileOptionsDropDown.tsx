import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { FaRegAddressCard } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { UserRoles } from '@constants'
import { useJoyRide } from '@hooks'
import {
    commonApi,
    industryApi,
    rtoApi,
    studentApi,
    subAdminApi
} from '@queries'
import { useEffect } from 'react'

export const ProfileOptionsDropDown = ({
    expanded,
    setExpanded,
}: {
    expanded: boolean
    setExpanded: Function
}) => {
    const dispatch = useDispatch()

    const router = useRouter()
    const role = getUserCredentials()?.role
    //  EDIT PROFILE JOY RIDE
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 0 })
            }, 1200)
        }
    }, [])

    //  EDIT PROFILE JOY RIDE

    return (
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
                                role === UserRoles.SUBADMIN ? 'sub-admin' : role
                            }/my-profile`
                        )
                        setExpanded(false)
                    }}
                    className="flex items-center gap-x-4 px-4 py-2 border-b hover:bg-gray-100 cursor-pointer"
                >
                    <span className="text-gray-400">
                        <FaRegAddressCard />
                    </span>
                    <p className="text-sm text-gray-600 font-medium">Profile</p>
                </li>
                <li
                    onClick={() => {
                        AuthUtils.logout(router)
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
    )
}

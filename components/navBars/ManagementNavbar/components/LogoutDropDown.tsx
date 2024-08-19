import Image from 'next/image'
import { LogoutAvatar } from './LogoutAvatar'
import { Typography } from '@components/Typography'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { CommonApi, managementApi } from '@queries'
import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
export const LogoutDropDown = ({ isExpanded, setIsExpanded }: any) => {
    const router = useRouter()
    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()
    const dispatch = useDispatch()
    const toggleClick = () => setIsExpanded(!isExpanded)
    const user = getUserCredentials()
    return (
        <div
            onClick={toggleClick}
            className="flex items-center gap-x-3 relative cursor-pointer"
        >
            <LogoutAvatar
                name={`${
                    user?.role === 'marketing'
                        ? 'Marketing SEO'
                        : 'Operation Manager'
                }`}
            />
            <Typography variant={'body'} medium color="text-primaryNew">
                {user?.role === 'marketing'
                    ? 'Marketing SEO'
                    : 'Operation Manager'}
            </Typography>
            {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            <div
                className={`absolute left-2 top-10 bg-white shadow-lg rounded-md border w-32 ${
                    !isExpanded ? 'hidden' : 'block'
                }`}
            >
                <div
                    onClick={async () => {
                        if (AuthUtils.getToken()) {
                            await logoutActivity({})
                        }
                        AuthUtils.managerLogout(router)
                        dispatch(managementApi.util.resetApiState())
                    }}
                    className="text-sm text-slate-700 text-center font-medium hover:bg-primaryNew hover:text-white px-6 rounded-md py-2 transition-all "
                >
                    Logout
                </div>
            </div>
        </div>
    )
}

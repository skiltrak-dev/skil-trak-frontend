import { useRouter } from 'next/router'
import { CommonApi } from '@queries'

import { AiFillHome } from 'react-icons/ai'
import { Button } from '@components'
// import { NavLinks } from "../../NavLink";
import { AuthUtils } from '@utils'
import { HeaderLogo } from '../NavbarLogo'
import { NavItem } from '../NavItem'

import { AuthTypeOptions } from '@layouts'
import { LogoutType, useContextBar } from '@hooks'

interface AuthHeaderProps {
    type: (typeof AuthTypeOptions)[number]
}

export const AuthNavbar = ({ type }: AuthHeaderProps) => {
    const router = useRouter()
    const contextBar = useContextBar()

    const [logoutActivity] = CommonApi.LogoutActivity.perFormAcivityOnLogout()

    const onLogOut = async () => {
        if (AuthUtils.token()) {
            await logoutActivity({})
        }
        AuthUtils.logout(router)
        contextBar.setContent(null)
        contextBar.setTitle(null)
        contextBar.hide()
    }

    const onLogin = () => {
        router.push('/auth/login')
    }

    const onSignUp = () => {
        router.push('/auth/signup')
    }

    return (
        <div className="w-full py-2 bg-white border-b border-secondary-dark">
            <div className="px-4 md:px-16 h-full mx-auto flex justify-between items-center">
                <HeaderLogo />
                <div className="flex items-center gap-x-5">
                    <div className="bg-gray-100 md:bg-transparent rounded-md">
                        <NavItem
                            Icon={AiFillHome}
                            color={'transparent'}
                            link={'/'}
                        >
                            <span className="hidden md:block font-bold">
                                Homepage
                            </span>
                        </NavItem>
                    </div>
                    {/* {AuthUtils.isAuthenticated() ? ( */}
                    {(false || type === 'logged-in') && (
                        <Button variant={'error'} onClick={onLogOut}>
                            Log Out
                        </Button>
                    )}

                    {type === 'log-in' && (
                        <Button onClick={onSignUp}>Sign Up</Button>
                    )}

                    {type === 'sign-up' && (
                        <Button onClick={onLogin}>Log In</Button>
                    )}
                </div>
            </div>
        </div>
    )
}

import { useRouter } from 'next/router'

import { AiFillHome } from 'react-icons/ai'
import { Button } from '@components'
// import { NavLinks } from "../../NavLink";
import { AuthUtils } from '@utils'
import { HeaderLogo } from '../NavbarLogo'
import { NavItem } from '../NavItem'

import { AuthTypeOptions } from '@layouts'

interface AuthHeaderProps {
    type: typeof AuthTypeOptions[number]
}

export const AuthNavbar = ({ type }: AuthHeaderProps) => {
    const router = useRouter()

    const onLogOut = () => {
        AuthUtils.logout(router)
    }

    const onLogin = () => {
        router.push('/auth/login')
    }

    const onSignUp = () => {
        router.push('/auth/login')
    }

    return (
        <div className="w-full py-2 bg-white border-b border-secondary-dark">
            <div className="px-16 h-full mx-auto flex justify-between items-center">
                <HeaderLogo />
                <div className="flex items-center gap-x-5">
                    <NavItem Icon={AiFillHome} color={'transparent'} link={'/'}>
                        <span className="font-bold">Homepage</span>
                    </NavItem>
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

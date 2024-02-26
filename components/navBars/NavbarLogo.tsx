import { MediaQueries, UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

export const HeaderLogo = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const width = isMobile ? 80 : 140

    const role = getUserCredentials()?.role
    return (
        <Link
            legacyBehavior
            href={`/portals/${
                role === UserRoles.SUBADMIN ? 'sub-admin' : role
            }`}
        >
            <a className="flex-shrink-0">
                {/* <Image
                    className={'w-24 md:w-32 mx-auto'}
                    src={`/images/skiltrak_logo.svg`}
                    alt="Logo"
                    height={40}
                    width={width}
                    priority
                /> */}
                <img
                    className={'w-24 md:w-32 mx-auto'}
                    src={`/images/skiltrak_logo.svg`}
                    alt="Logo"
                />
            </a>
        </Link>
    )
}

import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import { MediaQueries } from '@constants'

export const HeaderLogo = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const width = isMobile ? 80 : 140
    return (
        <Link legacyBehavior href="/">
            <a className="flex-shrink-0">
                {/* <Image
                    className={'w-8 mx-auto'}
                    src={`/images/skiltrak_logo.svg`}
                    alt="Logo"
                    height={40}
                    width={width}
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

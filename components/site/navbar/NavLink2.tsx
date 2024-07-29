import Link from 'next/link'

import { css } from '@emotion/react'

import { Button } from '@components/buttons'
import { useRouter } from 'next/router'

export const NavLink2 = ({
    to,
    text,
    asButton = false,
    external,
    subMenus,
    onClick,
}: any) => {
    const router = useRouter()
    const linkCSS = css`
        &:after {
            content: '';
            display: block;
            width: 0%;
            height: 2px;
            background-color: #ea7e3f;
            margin-top: 8px;
            position: absolute;
            bottom: 0;
            right: 0;
            transition: width 0.4s ease;
        }
        &:hover:after {
            width: 100%;
            left: 0;
        }
    `

    const linkClasses = ` 
    text-black
    py-2
    mx-6
    text-sm
    uppercase
    font-semibold
    relative
    transition
    duration-300
    ease-in-out
    hover:text-amber-500
  `

    const getLink = () => {
        if (asButton) {
            return (
                // <Button2
                //     asLink={!external}
                //     to={to}
                //     text={text}
                //     external={external}
                // />
                <div className="lg:inline-block hidden">
                    {/* <Button
                        text={text}
                        variant="primary"
                        onClick={() => {
                            router.push('/auth/login')
                        }}
                    /> */}
                    <Link
                        className={
                            'bg-primary text-white hover:bg-primary-dark border-transparent ring-primary-light font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 rounded-md'
                        }
                        href={to}
                    >
                        {text}
                    </Link>
                </div>
            )
        } else if (external) {
            return (
                <a href={to} className={linkClasses}>
                    {text}
                </a>
            )
        } else {
            return (
                <div
                    onClick={() => {
                        if (onClick) {
                            onClick()
                        }
                    }}
                    className="relative group inline-block text-left"
                >
                    <Link href={to} className={linkClasses}>
                        {text}
                    </Link>

                    {subMenus && subMenus?.length > 0 ? (
                        <div className="lg:hidden group-hover:block lg:origin-top-right lg:absolute z-20 right-0 lg:mt-2 w-full lg:w-64 rounded-md lg:shadow-lg bg-white lg:ring-1 lg:ring-black lg:ring-opacity-5">
                            <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {subMenus?.map((subMenu: any, i: number) => (
                                    <Link
                                        key={i}
                                        href={subMenu?.url}
                                        className="block pl-10 font-semibold lg:pl-4 lg:px-4 py-1 lg:py-2 text-sm lg:font-medium text-black hover:bg-gray-100"
                                    >
                                        {subMenu?.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            )
        }
    }
    return getLink()
}

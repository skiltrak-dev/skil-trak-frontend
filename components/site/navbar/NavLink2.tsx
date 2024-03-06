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
                <div className="md:inline-block hidden">
                    <Button
                        text={text}
                        variant="primary"
                        onClick={() => {
                            router.push('/auth/login')
                        }}
                    />
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
                <div className="relative group inline-block text-left">
                    <Link href={to} className={linkClasses}>
                        {text}
                    </Link>

                    {subMenus && subMenus?.length > 0 ? (
                        <div className="md:hidden group-hover:block md:origin-top-right md:absolute z-20 right-0 md:mt-2 w-full md:w-64 rounded-md md:shadow-lg bg-white md:ring-1 md:ring-black md:ring-opacity-5">
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
                                        className="block pl-10 font-semibold md:pl-4 md:px-4 py-1 md:py-2 text-sm md:font-medium text-black hover:bg-gray-100"
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

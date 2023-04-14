import React from 'react'
import Link from 'next/link'

import { css, jsx } from '@emotion/react'

import { Button2 } from '../Button2'

export const NavLink2 = ({ to, text, asButton = false, external }: any) => {
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
    font-medium
    relative
    transition
    duration-300
    ease-in-out
    hover:text-amber-500
  `

    const getLink = () => {
        if (asButton) {
            return (
                <Button2
                    asLink={!external}
                    to={to}
                    text={text}
                    external={external}
                />
            )
        } else if (external) {
            return (
                <a href={to} className={linkClasses}>
                    {text}
                </a>
            )
        } else {
            return (
                <Link href={to} className={linkClasses}>
                    {text}
                </Link>
            )
        }
    }
    return getLink()
}

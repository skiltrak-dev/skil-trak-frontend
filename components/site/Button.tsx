import React from 'react'
import Link from 'next/link'
import BeatLoader from 'react-spinners/BeatLoader'

export const Button = ({
    text,
    asLink = false,
    to,
    onClick,
    className,
    type = 'button',
    isLoading,
    state,
    external,
}: any) => {
    const twStyles = `
    ${className}
    py-2 
    px-4
    bg-amber-500
    text-white
    font-medium
    rounded-lg
    shadow-md
    uppercase
    ${asLink ? 'inline-block' : 'block'}
    hover:bg-amber-700
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    focus:ring-opacity-75

  `

    if (type === 'submit') {
        return (
            <button type={'submit'} className={twStyles}>
                {isLoading ? <BeatLoader color={'#ffffff'} /> : text}
            </button>
        )
    }

    const getLink = () => {
        if (asLink) {
            return (
                <Link href={to} className={twStyles}>
                    {isLoading ? <BeatLoader color={'#ffffff'} /> : text}
                </Link>
            )
        }
        if (external) {
            return <a href={to} className={twStyles}></a>
        } else {
            return (
                <button onClick={() => onClick()} className={twStyles}>
                    {isLoading ? <BeatLoader color={'#ffffff'} /> : text}
                </button>
            )
        }
    }

    return getLink()
}

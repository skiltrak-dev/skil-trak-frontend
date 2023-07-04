import Link from 'next/link'
import { ReactNode } from 'react'
// import { PortalLinksStyles } from "./style";

interface PortalSelectButtonProps {
    link: string
    Icon: string
    children: ReactNode
    onMouseEnter: () => void
}
export const PortalSelectButton = ({
    link,
    Icon,
    children,
    onMouseEnter,
}: PortalSelectButtonProps) => {
    return (
        <Link legacyBehavior href={link}>
            <a
                className={`group transition-all text-center text-lg h-20 w-60 font-bold flex justify-start items-center px-4 py-2 border border-primary rounded-lg text-black hover:text-white hover:bg-primary`}
                onMouseEnter={() => {
                    onMouseEnter()
                }}
            >
                <img
                    src={Icon}
                    alt=""
                    className="filter group-hover:grayscale group-hover:saturate-100 group-hover:brightness-200 mr-8"
                />
                {children}
            </a>
        </Link>
    )
}

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Typography } from '@components/Typography'

type NavLinkProps = {
    href: string
    label: string
    activePaths: string[]
}

export const ManagementNavLink = ({
    href,
    label,
    activePaths,
}: NavLinkProps) => {
    const router = useRouter()

    const isActive = activePaths.some((path) =>
        router.pathname.startsWith(path)
    )

    return (
        <Link href={href}>
            <Typography
                variant="small"
                color={isActive ? 'text-primaryNew' : 'text-gray-400'}
                bold={isActive}
            >
                {label}
            </Typography>
        </Link>
    )
}

import { NavbarBreadCrumbs } from '@components/navBars/AdminNavbar/components'
import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'

interface PageTitleProps {
    title: string
    navigateBack?: boolean
    backTitle?: string
}
export const PageTitle = ({
    title,
    navigateBack,
    backTitle,
}: PageTitleProps) => {
    const router = useRouter()

    const paths = router.pathname.split('/')
    const links = paths.slice(1, -1)

    var find = '-'
    var remove = new RegExp(find, 'g')

    const breadCrumbTitle = paths[paths.length - 1].replace(remove, ' ')

    return (
        <div>
            {/* Title */}
            <div>
                <Typography variant={'h4'} capitalize>
                    {title || 'Dashboard'}
                </Typography>

                <NavbarBreadCrumbs links={links} title={breadCrumbTitle} />
            </div>

            {/* Other actions */}
        </div>
    )
}

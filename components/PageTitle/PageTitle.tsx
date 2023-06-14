import { BackButton } from '@components/buttons'
import { NavbarBreadCrumbs } from '@components/navBars/AdminNavbar/components'
import { Typography } from '@components/Typography'
import { useNavbar } from '@hooks'
import { useRouter } from 'next/router'

export interface PageTitleProps {
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

    const navBar = useNavbar()

    const paths = router.asPath.split('/')
    let links = paths.slice(1, -1)
    // links = links?.filter((link) => !link.includes('['))

    var find = '-'
    var remove = new RegExp(find, 'g')

    const breadCrumbTitle = paths[paths.length - 1].replace(remove, ' ')

    return (
        <div>
            {/* Title */}
            <div>
                {navigateBack || backTitle ? (
                    <BackButton text={backTitle} />
                ) : null}
                <Typography variant={'h4'} capitalize>
                    {title || 'Dashboard'}
                </Typography>

                <NavbarBreadCrumbs
                    links={links}
                    title={navBar?.subTitle || title || breadCrumbTitle}
                />
            </div>

            {/* Other actions */}
        </div>
    )
}

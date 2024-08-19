import { getUserCredentials } from "@utils"

const user = getUserCredentials()

export const linksData = [
    {
        href: '/portals/management/dashboard',
        label: 'Dashboard',
        activePaths: [
            '/portals/management/dashboard',
            '/portals/management/dashboard/[id]',
        ],
        visible: user?.role !== 'marketing',
    },
    {
        href: '/portals/management/student-list',
        label: 'Student List',
        activePaths: ['/portals/management/student-list'],
        visible: user?.role !== 'marketing',
    },
    {
        href: '/portals/management/blogs?tab=published&page=1&pageSize=50',
        label: 'Blogs',
        activePaths: ['/portals/management/blogs'],
        visible: user?.role === 'marketing',
    },
    // Add more links as needed
]
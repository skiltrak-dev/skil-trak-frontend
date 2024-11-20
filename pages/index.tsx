import { lazy, ReactElement, useEffect, useRef, useState } from 'react'

import { SiteLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { NoData } from '@components'

const JumboSection = lazy(() => import('@components/site/JumboSection'))
const FeatureBlogs = lazy(
    () => import('@components/site/FeatureBlogs/FeatureBlogs')
)
const LatestUpdates = lazy(
    () => import('@partials/frontPages/home2/LatestUpdates/LatestUpdates')
)
const RecentJobs = lazy(
    () => import('@partials/frontPages/home2/RecentJobs/RecentJobs')
)
const TechnicalPartners = lazy(
    () =>
        import('@partials/frontPages/home2/TechnicalPartners/TechnicalPartners')
)
const OurPartners = lazy(
    () => import('@partials/frontPages/home2/OurPartners/OurPartners')
)
const OurPackages = lazy(
    () => import('@partials/frontPages/home2/OurPackages/OurPackages')
)
const OperateStates = lazy(
    () => import('@partials/frontPages/home2/OperateStates/OperateStates')
)
const GetStarted = lazy(
    () => import('@partials/frontPages/home2/GetStarted/GetStarted')
)
const ContactUs = lazy(
    () => import('@partials/frontPages/home2/ContactUs/ContactUs')
)
const StudentPlacementManagement = lazy(
    () =>
        import(
            '@components/site/studentPlacementManagement/StudentPlacementManagement'
        )
)
const KeyFeatures = lazy(
    () => import('@components/site/keyFeatures/KeyFeatures')
)

const Home3: NextPageWithLayout = ({ data }: any) => {
    const contactUsRef = useRef(null)
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    return (
        <div>
            <JumboSection />
            {/* <Asia100Award /> */}
            {/* Key Features */}
            <KeyFeatures /> {/* Student Placement Management System */}
            <StudentPlacementManagement />{' '}
            <div className="relative">
                {/* Our packages */}
                <OurPackages />{' '}
            </div>
            {/* Our Partners */}
            <OurPartners /> {/* We Operate in the Following States */}
            <OperateStates />
            <GetStarted contactUsRef={contactUsRef} /> <RecentJobs />
            <ContactUs /> {/*  */}
            <TechnicalPartners />
            <FeatureBlogs blogs={data} /> <LatestUpdates />
        </div>
    )
}

Home3.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`)
    const data = await res.json()
    if (!data) {
        return <NoData text="No Data" />
    }
    return {
        props: {
            data,
        },
        revalidate: 3600,
    }
}

// export async function getStaticProps() {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_END_POINT}/blogs/site`
//         )
//         const data = await res.json()

//         return {
//             props: {
//                 data: data || null, // Ensure data is never undefined
//             },
//             revalidate: 3600,
//         }
//     } catch (error) {
//         console.error('Error fetching blogs:', error)
//         return {
//             props: {
//                 data: null,
//             },
//             revalidate: 3600,
//         }
//     }
// }

export default Home3

import type { NextPage } from 'next'

import { Animations } from '@animations'
import { LottieAnimation, Navbar, Typography } from '@components'

const PageNotFound: NextPage = () => {
    return (
        <div>
            <Navbar />
            <div className="h-[90vh] flex flex-col items-center justify-center">
                <LottieAnimation
                    width={320}
                    height={200}
                    animation={Animations.Common.PageNotFound}
                />
                <Typography variant="h2" color="text-muted-dark">
                    Page Not Found
                </Typography>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: [],
        },
    }
}

export default PageNotFound

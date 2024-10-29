import { Animations } from '@animations'
import { Button, LottieAnimation, Navbar } from '@components'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { MediaQueries } from '@constants'
import { useMediaQuery } from 'react-responsive'

const UnderConstruction: NextPage = () => {
    const router = useRouter()

    const isMobile = useMediaQuery(MediaQueries.Mobile)
    const width = isMobile ? 180 : 280

    return (
        <div className="w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <div className="">
                    <div>
                        <LottieAnimation
                            height={width}
                            width={width}
                            animation={Animations.Common.UnderConstruction}
                        />
                    </div>

                    <div className="mt-4 mb-8">
                        <p className={'font-bold text-center md:text-2xl'}>
                            This Page Is Under Constructions
                        </p>
                        <p className="text-sm text-center">
                            Check with developers for more updates
                        </p>
                    </div>
                </div>

                <Button
                    onClick={() => {
                        router.push('/auth/login')
                    }}
                >
                    Login
                </Button>
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

export default UnderConstruction

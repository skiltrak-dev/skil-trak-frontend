import dynamic from 'next/dynamic'

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('react-lottie'), {
    ssr: false,
})

interface LottieAnimationProps {
    loop?: boolean
    autoplay?: boolean
    animation: any
    height?: number
    width?: number
}

export const LottieAnimation = ({
    loop = true,
    autoplay = true,
    animation,
    height = 120,
    width = 120,
}: LottieAnimationProps) => {
    const animationOptions = {
        loop,
        autoplay,
        animationData: animation,
    }

    return (
        <div>
            <Lottie options={animationOptions} height={height} width={width} />
        </div>
    )
}

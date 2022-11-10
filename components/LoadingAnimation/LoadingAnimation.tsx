import { Animations } from '@animations'
import { LottieAnimation } from '@components/LottieAnimation'

export const LoadingAnimation = ({
    size,
    width,
    height,
}: {
    size?: number
    width?: string
    height?: string
}) => {
    return (
        <div
            className={`${width ? width : 'w-full'} ${
                height ? height : 'h-auto'
            } flex items-center justify-center`}
        >
            <LottieAnimation
                animation={Animations.Common.Loading}
                autoplay
                loop
                height={size || 120}
                width={size || 120}
            />
        </div>
    )
}

import { Animations } from '@animations'
import { LottieAnimation } from '@components/LottieAnimation'
export const PrePageLoading = () => (
    <div className={'w-screen h-screen flex items-center justify-center'}>
        <LottieAnimation
            width={320}
            height={200}
            animation={Animations.Common.PageLoading}
        />
    </div>
)

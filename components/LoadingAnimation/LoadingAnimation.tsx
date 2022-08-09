import { Animations } from "@animations";
import { LottieAnimation } from "@components/LottieAnimation";

export const LoadingAnimation = ({ size }: { size?: number }) => {
	return (
		<div className="w-full flex items-center justify-center">
			<LottieAnimation
				animation={Animations.Common.Loading}
				autoplay
				loop
				height={size || 120}
				width={size || 120}
			/>
		</div>
	);
};

import { LottieAnimation } from "@components/LottieAnimation";
import Link from "next/link";


// components
import { Typography } from "../../Typography";

export interface PrimaryActionButtonProps {
    title: string
	description: string
	image?: string
	shadow?: boolean,
	link: string,
	animation: any
}

export const PrimaryActionButton = ({
	title,
	description,
	image,
	shadow = true,
	link,
	animation,
}: PrimaryActionButtonProps) => {

	return (
		<Link
			href={`${link}` || "/under-construction"}
			className={`border flex justify-between items-center gap-x-5 py-2 px-4 rounded-lg w-full cursor-pointer bg-white hover:bg-gray-100`}
		>
			<div className="flex-grow">
				<Typography variant={"label"}>{title}</Typography>
				<Typography variant={"small"} color={"grayLight"}>
					{description}
				</Typography>
			</div>
			{image ? (
				<img className="h-16" src={image} alt="Info" />
			) : animation ? (
				<div>
					<LottieAnimation animation={animation} height={80} />
				</div>
			) : (
				<></>
			)}
		</Link>
	);
};

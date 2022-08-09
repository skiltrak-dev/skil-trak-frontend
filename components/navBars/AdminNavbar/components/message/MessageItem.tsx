import { Typography } from "@components";
import { MouseEventHandler } from "react";
import { AiFillBell, AiOutlineMail } from "react-icons/ai";

interface MessageItemProps {
	title: string;
	description: string;
	timestamp: string;
	icon?: any;
	avatar?: string;
	onClick?: MouseEventHandler;
}

export const MessageItem = ({
	title,
	description,
	timestamp,
	icon,
	avatar,
	onClick,
}: MessageItemProps) => {
	const Icon = icon;

	return (
		<div
			onClick={onClick}
			className="flex items-center border-b py-2 px-4 hover:bg-secondary cursor-pointer"
		>
			{icon ? (
				<div className="text-gray-500 bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2">
					<Icon />
				</div>
			) : avatar ? (
				<img
					className="h-8 w-8 rounded-md flex items-center justify-center mr-2"
					src="https://picsum.photos/128/128"
					alt=""
				/>
			) : (
				<div className="text-gray-500 bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2">
					<AiFillBell />
				</div>
			)}

			<div className="flex-grow">
				<Typography variant={"subtitle"}>{title}</Typography>
				<Typography variant={"muted"} color={"text-muted"}>
					{description}
				</Typography>
			</div>
			<div className="flex flex-col items-end">
				<Typography variant={"small"} color={"text-muted"}>
					{timestamp}
				</Typography>
				<AiOutlineMail />
			</div>
		</div>
	);
};

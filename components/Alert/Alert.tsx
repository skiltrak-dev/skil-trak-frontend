import { useEffect, useRef, useState } from "react";

import { IoCloseSharp } from "react-icons/io5";

import { useAlert } from "@hooks";
import { Typography } from "@components";

import { theme } from "./theme";

export const AlertType = {
	success: "success",
	info: "info",
	error: "error",
	waning: "warning",
};

const VariantOptions = ["success", "info", "error", "warning"] as const;

export interface AlertProps {
	id?: number;
	title: string;
	description: string;
	avatar?: string | undefined;
	icon?: any;
	variant?: typeof VariantOptions[number];
	dismiss?: boolean;
	autoDismiss?: boolean;
}

export const Alert = ({
	id,
	title,
	description,
	avatar,
	icon,
	variant = "success",
	dismiss = true,
	autoDismiss = true,
}: AlertProps) => {
	const alert = useAlert();
	const dismissRef = useRef(alert.dismiss);
	dismissRef.current = alert.dismiss;

	const [dismissing, setDismissing] = useState(false);
	const dismissingRef = useRef(dismissing);
	dismissingRef.current = dismissing;

	const [hovered, setHovered] = useState(false);

	const Icon = icon || theme[variant].icon;

	useEffect(() => {
		if (autoDismiss && !hovered) {
			const timer = setTimeout(() => {
				setDismissing(!dismissingRef.current);
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [autoDismiss, hovered]);

	useEffect(() => {
		if (dismissing) {
			const timer = setTimeout(() => {
				if (id) dismissRef.current(id);
			}, 300);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [dismissing]);

	return (
		<div
			className={`${
				!dismissing ? "fade-in" : "fade-out"
			} w-full h-16 flex items-center border border-dashed rounded-lg ${
				theme[variant].border
			}  ${theme[variant].bg}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div
				className={`w-12 h-12 rounded-xl m-2 overflow-hidden flex justify-center items-center ${theme[variant].iconBg}`}
			>
				{avatar ? (
					<img className="w-full h-full " src={avatar} alt="" />
				) : Icon ? (
					<Icon className={`text-4xl text-white`} />
				) : (
					<></>
				)}
			</div>

			<div className="flex-grow px-3">
				<div className={`${theme[variant].text}`}>
					<Typography variant={"title"}>{title}</Typography>
				</div>
				<Typography>{description}</Typography>
			</div>

			{dismiss && (
				<button
					className={`text-xl mr-2 ${theme[variant].text}`}
					onClick={() => {
						setDismissing(true);
					}}
				>
					<IoCloseSharp />
				</button>
			)}
		</div>
	);
};

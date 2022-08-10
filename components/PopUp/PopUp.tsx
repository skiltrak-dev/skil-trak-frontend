import { LoadingAnimation, Typography } from "@components";

export const PopupTypes = {
	SUCCESS: "success",
	INFO: "info",
	ERROR: "error",
};

const VariantOptions = ["success", "info", "error"] as const;

interface PopUpProps {
	title: string;
	subtitle: string;
	shadow: boolean;
	variant: typeof VariantOptions[number];
}

export const Popup = ({ title, subtitle, shadow, variant }: PopUpProps) => {
	return (
		<div
			className={`w-full h-60 rounded-2xl flex flex-col justify-center items-center gap-y-4 bg-white ${
				shadow ? "shadow" : ""
			}`}
		>
			<div>
				<LoadingAnimation />
			</div>
			<div className="">
				<Typography variant={"h4"} color={`text-${variant}`} center>
					{title}
				</Typography>
				<Typography variant={"muted"} center color={"text-gray-500"}>
					{subtitle}
				</Typography>
			</div>
		</div>
	);
};

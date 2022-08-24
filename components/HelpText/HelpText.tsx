import { Typography } from "@components";

export const HelpText = ({ text }: { text: string | undefined }) =>
	text ? (
		<div className="mt-1 ml-2">
			<Typography variant={"small"} color={"text-muted"}>
				{text}
			</Typography>
		</div>
	) : null;

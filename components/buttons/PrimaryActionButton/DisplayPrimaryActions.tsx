import {
	PrimaryActionButton,
	PrimaryActionButtonProps,
} from "./PrimaryActionButton";

export const DisplayPrimaryActions = ({
	actions,
}: {
	actions: PrimaryActionButtonProps[];
}) => {
	return (
		<div className="flex flex-col justify-center items-center gap-y-2">
			{actions.map((action, i) => (
				<PrimaryActionButton
					key={i}
					link={action.link}
					title={action.title}
					description={action.description}
					image={action.image}
					animation={action.animation}
					id={action.id}
				/>
			))}
		</div>
	);
};

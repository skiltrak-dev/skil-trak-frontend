interface CardProps {
	children?: any;
	noPadding?: boolean;
}

export const Card = ({ children, noPadding }: CardProps) => {
	return (
		<div
			className={`w-full bg-white shadow rounded-lg ${
				noPadding ? "p-0" : "p-8"
			}`}
		>
			{children}
		</div>
	);
};

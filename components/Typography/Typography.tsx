const TypographyType = {
	h1: `text-4xl font-bold`,
	h2: `text-3xl font-bold`,
	h3: `text-2xl font-bold`,
	h4: `text-xl font-bold`,
	title: `text-lg font-semibold`,
	subtitle: `text-base font-medium`,
	label: `text-sm font-medium`,
	muted: `text-xs font-medium`,
	small: `text-xs font-normal`,
	xs: `text-[11px] font-normal`,
	tableCell: `text-xs font-medium`,
	badge: `text-[9px] font-semibold`,
};

const VariantOptions = [
	"h1",
	"h2",
	"h3",
	"h4",
	"title",
	"subtitle",
	"label",
	"muted",
	"small",
	"xs",
	"tableCell",
	"badge",
] as const;

interface TypographyProps {
	variant: typeof VariantOptions[number];

	children: string;

	// Label Specific
	htmlFor?: string;

	// Transform
	uppercase?: boolean;
	capitalize?: boolean;

	// Alignment
	center?: boolean;
	left?: boolean;
	right?: boolean;

	color?: string;
}

export const Typography = ({
	variant,
	children,

	// Alignment
	center,
	left,
	right,

	// Transform
	uppercase,
	capitalize,

	// Label Specific
	htmlFor,

	// tailwind class
	color = "text-typography",
}: TypographyProps) => {
	let classes = `${color}`;

	if (left) {
		classes = `${classes} text-left`;
	} else if (center) {
		classes = `${classes} text-center`;
	} else if (right) {
		classes = `${classes} text-right`;
	}

	if (capitalize) {
		classes = `${classes} capitalize`;
	} else if (uppercase) {
		classes = `${classes} uppercase`;
	}

	const Component = `${variant}` as keyof JSX.IntrinsicElements;
	return (
		<Component className={`${(TypographyType as any)[variant]} ${classes}`}>
			{children}
		</Component>
	);
};

import PuffLoader from "react-spinners/PuffLoader";
import { getTheme } from "./theme";

export const ButtonType = {
	Primary: "primary",
	Secondary: "secondary",
	Info: "info",
	Error: "error",
	Action: "action",
	Dark: "dark",
};

const VariantOptions = [
	"primary",
	"secondary",
	"info",
	"error",
	"action",
	"dark",
] as const;

interface ButtonProps {
	variant?: typeof VariantOptions[number];
	Icon?: any;
	children?: any;
	text?: string;
	onClick: Function;
	disabled?: boolean;
	rounded?: boolean;
	loading?: boolean;
	outline?: boolean;
	submit?: boolean;
	fullWidth?: boolean;
	mini?: boolean;
}

export const Button = ({
	variant = "primary",
	disabled,
	Icon,
	rounded,
	onClick,
	children,
	text,
	loading,
	outline,
	submit,
	fullWidth,
	mini,
}: ButtonProps) => {
	const buttonClass = `text-sm font-semibold transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 ${
		rounded ? "rounded-full" : "rounded-md"
	} ${fullWidth ? "w-full" : "min-w-[125px]"} `;

	const miniButtonClass = `transition-all duration-300 cursor-pointer w-6 h-6 flex items-center justify-center rounded shadow`;

	const theme = getTheme(mini ? miniButtonClass : buttonClass, ButtonType);

	const currentClass = disabled
		? theme[variant as any].disabled
		: outline
		? theme[variant as any].outline
		: theme[variant as any].default;

	const currentLoadingColor = disabled
		? theme[variant as any].loading.disabled
		: outline
		? theme[variant as any].loading.outline
		: theme[variant as any].loading.default;

	return (
		<button
			disabled={disabled}
			type={submit ? "submit" : "button"}
			className={currentClass}
			{...(!submit ? { onClick: () => onClick() } : {})}
		>
			{loading ? (
				<div className="flex items-center justify-center">
					<PuffLoader size={24} color={currentLoadingColor} />
				</div>
			) : (
				<div className="flex items-center justify-center">
					{Icon && <Icon className={`text-xl mr-2`} />}
					{!mini && <p>{text || children}</p>}
				</div>
			)}
		</button>
	);
};

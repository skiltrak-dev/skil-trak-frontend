import { BsCheckCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoWarning, IoWarningOutline } from "react-icons/io5";

export const theme = {
	success: {
		icon: BsCheckCircleFill,
		iconBg: "bg-success-dark",
		border: "border-success-dark",
		bg: "bg-success-light",
		text: "text-success-dark",
	},
	info: {
		icon: BsFillInfoCircleFill,
		iconBg: "bg-info-dark",
		border: "border-info-dark",
		bg: "bg-info-light",
		text: "text-info-dark",
	},
	error: {
		icon: IoWarningOutline,
		iconBg: "bg-error-dark",
		border: "border-error-dark",
		bg: "bg-error-light",
		text: "text-error-dark",
	},
	warning: {
		icon: IoWarning,
		iconBg: "bg-primary-dark",
		border: "border-primary-dark",
		bg: "bg-primary-light",
		text: "text-primary-dark",
	},
};

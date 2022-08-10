import { BsBellFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { MdEmail, MdError } from "react-icons/md";

export const theme = {
	default: {
		icon: {
			color: "text-gray-600",
			element: BsBellFill,
			bg: "bg-gray-300",
		},
		title: "text-black",
	},
	success: {
		icon: {
			color: "text-white",
			element: FaCheckCircle,
			bg: "bg-success",
		},
		title: "success",
	},
	info: {
		icon: {
			color: "text-white",
			element: BsFillInfoCircleFill,
			bg: "bg-info",
		},
		title: "info",
	},
	warning: {
		icon: {
			color: "text-white",
			element: IoWarning,
			bg: "bg-primary",
		},
		title: "primary",
	},
	error: {
		icon: {
			color: "text-white",
			element: MdError,
			bg: "bg-error",
		},
		title: "error",
	},
	message: {
		icon: {
			color: "text-gray-600",
			element: MdEmail,
			bg: "bg-gray-300",
		},
		title: "text-black",
	},
};

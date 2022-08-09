import Link from "next/link";
import { MouseEventHandler } from "react";

interface NavItemProps {
	link?: string;
	Icon?: any;
	children: any;
	active?: boolean;
	color?: string;
	onClick?: MouseEventHandler;
}

export const NavItem = ({
	link,
	Icon,
	children,
	active,
	color,
	onClick,
}: NavItemProps) => {
	return link ? (
		<Link href={link}>
			<div
				className={`${
					active ? "bg-primary text-white" : "bg-transparent"
				} text-sm transition-all duration-300 cursor-pointer border-transparent px-4 py-2 focus:outline-none focus:ring-4 hover:bg-secondary hover:text-typography-light rounded-lg flex justify-start items-center`}
			>
				<Icon className="inline-flex mr-2 text-sm" />
				{children}
			</div>
		</Link>
	) : (
		<div
			className={`${
				active ? "bg-primary text-white" : "bg-transparent"
			} text-sm transition-all duration-300 cursor-pointer border-transparent px-4 py-2 focus:outline-none focus:ring-4 hover:bg-secondary hover:text-typography-light rounded-lg flex justify-start items-center`}
			onClick={onClick}
		>
			<Icon className="inline-flex mr-3.5 text-sm" />
			{children}
		</div>
	);
};

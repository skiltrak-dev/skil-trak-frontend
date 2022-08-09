import Link from "next/link";
import { Fragment } from "react";

export const NavbarBreadCrumbs = ({
	links,
	title,
}: {
	links: string[];
	title: string;
}) => {
	return (
		<div className="flex">
			<Link href="/">Dashboard</Link> <span>/</span>{" "}
			{links.map((link, index) => (
				<Fragment key={index}>
					<Link href={`/${links.slice(0, index + 1).join("/")}`}>
						{link.replace("-", " ")}
					</Link>{" "}
					<span>/</span>{" "}
				</Fragment>
			))}
			{title}
		</div>
	);
};

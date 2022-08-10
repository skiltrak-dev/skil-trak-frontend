import { Footer } from "components/Footer";
import Link from "next/link";
import { SideBarItem } from "../SideBarItem";

import { Advertisement, UserActions } from "./components";

export const SideBar = ({ routes }: any) => {
	return (
		<div className="min-w-240 max-w-240 h-screen bg-white border-r border-secondary-dark px-2 py-2 relative z-20 overflow-y-scroll remove-scrollbar">
			<Link href="/">
				<img
					className="w-10/12 mx-auto"
					src={`/images/skiltrak_logo.svg`}
					alt="Logo"
				/>
			</Link>

			<UserActions />

			<div className="px-2">
				{/* Before Ad Routes */}
				<div className="overflow-hidden">
					<div
						className={`my-1 flex flex-col items-start transition-all overflow-hidden`}
					>
						{routes.map((route: any, i: number) => {
							if (route.placement && route.placement === "after")
								return null;
							if (route.type === "title" && route.text)
								return (
									<p
										key={i}
										className="text-sm font-semibold text-gray"
									>
										{route.text}
									</p>
								);
							else if (route.type === "divider")
								return (
									<div
										key={i}
										className="w-full h-[0.1px] bg-gray-300 my-2"
									></div>
								);
							else
								return (
									<SideBarItem
										key={route.text}
										Icon={route.Icon}
										link={route.path.replace("*", "")}
									>
										{route.text}
									</SideBarItem>
								);
						})}
					</div>
				</div>

				<Advertisement />

				{/* After Ad Routes */}
				<div className="overflow-hidden">
					<div
						className={`my-1 flex flex-col items-start transition-all overflow-hidden`}
					>
						{routes.map((route: any) => {
							if (
								!route.placement ||
								route.placement === "before"
							)
								return null;
							if (route.type === "title" && route.text)
								return (
									<p className="text-sm font-semibold text-gray">
										{route.text}
									</p>
								);
							else if (route.type === "divider")
								return (
									<div className="w-full h-[0.1px] bg-gray-300 my-2"></div>
								);
							else
								return (
									<SideBarItem
										key={route.text}
										Icon={route.Icon}
										link={route.path}
									>
										{route.text}
									</SideBarItem>
								);
						})}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeaderLogo } from "../NavbarLogo";

export const Navbar = () => {
	return (
		<div className="w-full py-2 bg-white border-b border-secondary-dark">
			<div className="px-16 h-full mx-auto flex justify-between items-center">
				<HeaderLogo />
			</div>
		</div>
	);
};

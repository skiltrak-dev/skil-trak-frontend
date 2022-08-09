import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
	return (
		<Link href="/">
			<Image
				className="w-10/12 h-16 mx-auto"
				src={`/images/skiltrak_logo.svg`}
				alt="Logo"
				height={40}
				width={140}
			/>
		</Link>
	);
};

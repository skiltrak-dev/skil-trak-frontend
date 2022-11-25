import { Animations } from "@animations";
import { LottieAnimation, Navbar, Typography, Button } from "@components";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const UnderConstruction: NextPage = () => {
	const router = useRouter();

	return (
		<div className="w-full">
			<Navbar />
			<div className="flex flex-col items-center justify-center">
				<div>
					<LottieAnimation
						height={280}
						width={280}
						animation={Animations.Common.UnderConstruction}
					/>
				</div>

				<div className="mt-4 mb-8">
					<Typography variant={"h3"} center>
						This Page Is Under Constructions
					</Typography>
					<Typography center>
						Check with developers for more updates
					</Typography>
				</div>

				<Button
					onClick={() => {
						router.push('/auth/login');
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
};

export default UnderConstruction;

// Icons
import { IoMdArrowDroprightCircle } from "react-icons/io";

// components
import { SearchBox } from "@components";

// Context
import { useContextBar } from "@hooks";

export const ContextBar = () => {
	const contextBar = useContextBar();

	return (
		<div className="relative">
			<div
				className={`top-[63px] absolute z-50 transition-all duration-300 cursor-pointer ${
					contextBar.isVisible
						? "rotate-0 -left-[15px]"
						: "rotate-180 -left-12"
				} opacity-25 hover:opacity-75`}
				onClick={() =>
					contextBar.isVisible ? contextBar.hide() : contextBar.show()
				}
			>
				<IoMdArrowDroprightCircle className="text-3xl" />
			</div>
			<div
				className={`w-[350px] z-0 h-screen border-l border-secondary-dark p-4 top-0 right-0 bg-white remove-scrollbar overflow-y-scroll ${
					contextBar.isVisible
						? "translate-x-0 relative"
						: "translate-x-full fixed"
				}`}
				style={{ transition: "all 0.5s" }}
			>
				<div className="relative">
					<div className="mb-4">
						<SearchBox />
					</div>

					{/*  */}
					<div className="flex flex-col gap-y-4">
						{contextBar.content}
					</div>
				</div>
			</div>
		</div>
	);
};

"use client";

import { DraggableInput } from "./DraggableInput";

export const Contextbar = ({ content }: any) => {
	return (
		<div className="w-[250px] h-[100vh] bg-white px-4 py-2">
			<div className="text-sm font-medium">
				{content?.type || "Select Input"}
			</div>
			<hr />
			<div>
				<p className="text-sm font-medium">Location</p>
				<div className="grid grid-cols-2 gap-2">
					<div className="flex items-center">
						<p className="text-xs">x:</p>
						<input
							type="text"
							value={content?.location?.x}
							className="border p-0 w-full"
						/>
					</div>
					<div className="flex items-center ">
						<p className="text-xs">y:</p>
						<input
							type="text"
							value={content?.location?.y}
							className="border p-0 w-full"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div>
				<p className="text-sm font-medium">Data Label</p>
				<input
					type="text"
					value={content?.dataLabel}
					className="border p-0 w-full"
				/>
			</div>
		</div>
	);
};

"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export const DraggableInput = () => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "input",
		data: {
			dataLabel: "Some Data label",
		},
	});

	
	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<button
			ref={setNodeRef}
			className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full"
			style={style}
			{...listeners}
			{...attributes}
		>
			<span className="bg-blue-100 text-xs p-2 rounded-md border border-blue-400 text-blue-800">
				Text
			</span>
			<p className="text-sm">Text Field</p>
		</button>
	);
};

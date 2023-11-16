"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineMail } from "react-icons/md";

export const DraggableStudentEmail = () => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "input-student-email",
		data: {
			container: "students",
			target: "email",
			dataLabel: "student-email",
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
				<MdOutlineMail />
			</span>
			<p className="text-sm">Student Email</p>
		</button>
	);
};

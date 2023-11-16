"use client";

import { DndContext } from "@dnd-kit/core";
import { DraggableInput } from "./DraggableInput";
import {
	DraggableStudentEmail,
	DraggableStudentName,
} from "./draggable-inputs";
import { BiRename } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";

const ColorPreset = {
	student: "#f59e0b",
	rto: "#3b82f6",
	industry: "#10b981",
	coordinator: "",
	standard: "",
};
export const Sidebar = () => {
	return (
		<div className="w-[250px] h-[100vh] bg-white px-4 py-2">
			<div>
				<div className="text-sm font-medium">Student Fields</div>
				<div>
					<DraggableInput
						text="Student Name"
						id="input-student-name"
						data={{
							color: ColorPreset.student,
							placeholder: "Student Name",
						}}
						Icon={BiRename}
					/>

					<DraggableInput
						text="Student Email"
						id="input-student-email"
						data={{
							color: ColorPreset.student,
							placeholder: "Student Email",
						}}
						Icon={MdOutlineMail}
					/>
				</div>
			</div>

			<div>
				<div className="text-sm font-medium">RTO Fields</div>
				<div>
					<DraggableInput
						text="RTO Name"
						id="input-rto-name"
						data={{
							color: ColorPreset.rto,
							placeholder: "RTO Name",
						}}
						Icon={BiRename}
					/>

					<DraggableInput
						text="RTO Email"
						id="input-rto-email"
						data={{
							color: ColorPreset.rto,
							placeholder: "RTO Email",
						}}
						Icon={MdOutlineMail}
					/>
				</div>
			</div>

			<div>
				<div className="text-sm font-medium">Industry Fields</div>
				<div>
					<DraggableInput
						text="Industry Name"
						id="input-industry-name"
						data={{
							color: ColorPreset.industry,
							placeholder: "Industry Name",
						}}
						Icon={BiRename}
					/>

					<DraggableInput
						text="Industry Email"
						id="input-industry-email"
						data={{
							color: ColorPreset.industry,
							placeholder: "Industry Email",
						}}
						Icon={MdOutlineMail}
					/>
				</div>
			</div>
		</div>
	);
};

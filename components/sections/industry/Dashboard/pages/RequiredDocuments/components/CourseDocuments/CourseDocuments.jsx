import { useState } from "react";

// components
import { Typography } from "components";

// redux
import { Card } from "components";
import { GiEmptyHourglass } from "react-icons/gi";
import { PuffLoader } from "react-spinners";
import { useGetDocumentsQuery } from "redux/query";
import { CustomRequirementForm } from "../../forms/CustomRequirementForm";
import { CustomDocInput } from "./CustomDocInput";
import { DocumentInputField } from "./DocumentInputField";

export const CourseDocuments = ({ course }) => {
	const { data, isSuccess, isLoading } = useGetDocumentsQuery(course.id);

	const [showCustomRequirementForm, setShowCustomRequirementForm] =
		useState(false);

	const showCustomRequirements = () => {
		const filtered = data.filter(
			({ folder_isCustom, folder_courseId }) =>
				folder_isCustom && folder_courseId === course.id
		);

		return filtered.length > 0;
	};

	const getRelatedData = () => {
		return data?.filter(
			({ folder_courseId }) => folder_courseId === course.id
		);
	};

	const getCustomRelatedData = () => {
		return data?.filter(
			({ folder_isCustom, folder_courseId }) =>
				folder_isCustom && folder_courseId === course.id
		);
	};


	return (
		<Card mt={2}>
			{isLoading ? (
				<div className="w-full h-36 flex items-center justify-center">
					<PuffLoader />
				</div>
			) : showCustomRequirementForm ? (
				<CustomRequirementForm
					courseId={course.id}
					onCancel={() => setShowCustomRequirementForm(false)}
				/>
			) : (
				<div>
					<div className="flex justify-between">
						<div>
							<Typography>
								Please select documents you want to require from
								students
							</Typography>
							<Typography variant={"muted"} color={"gray"}>
								Only selected documents will be required
							</Typography>
						</div>
						<div className="flex items-start gap-x-2">
							<p
								className="text-sm font-bold cursor-pointer text-info"
								onClick={() => {
									setShowCustomRequirementForm(true);
								}}
							>
								+ Add Custom
							</p>
						</div>
					</div>

					{/* Checkboxes */}
					{getRelatedData().length ? (
						<div className="grid grid-cols-2 gap-x-4 gap-y-2 my-2">
							{data?.map(
								({
									folder_id,
									folder_name,
									documents_checked,
									folder_isRequired,
									folder_isCustom,
									documents_id,
									folder_courseId,
								}) =>
									!folder_isCustom && (
										<DocumentInputField
											key={folder_id}
											name={folder_name}
											checked={documents_checked}
											required={folder_isRequired}
											folder={{
												folderId: folder_id,
												documentId: documents_id,
												courseId: folder_courseId,
												isCustom: folder_isCustom,
											}}
										/>
									)
							)}
						</div>
					) : (
						<div className="my-4 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed w-fit p-16 mx-auto rounded text-gray-300">
							<div className="mb-4 text-3xl ">
								<GiEmptyHourglass />
							</div>
							<p className="text-sm font-semibold">
								No Current Courses Here
							</p>
						</div>
					)}

					{isSuccess && !isLoading && showCustomRequirements() && (
						<>
							<div className="mt-4 mb--2">
								<Typography variant={"muted"} color={"gray"}>
									Custom Requirements
								</Typography>
							</div>

							<div className="text-xs font-semibold flex justify-between py-1 mt-1">
								<span className="w-2/5 flex-grow">Folder</span>
								<span className="w-1/5 text-center">
									Is Required
								</span>
								<span className="w-1/5 text-center">Type</span>
								<span className="w-1/5 text-center">
									Actions
								</span>
							</div>

							<div className="">
								{getCustomRelatedData().map(
									({
										folder_id,
										folder_name,
										documents_checked,
										folder_isRequired,
										folder_isCustom,
										documents_id,
										folder_courseId,
										folder_type
									}) => (
										<CustomDocInput
											key={folder_id}
											name={folder_name}
											checked={documents_checked}
											required={folder_isRequired}
											type={folder_type}
											folder={{
												folderId: folder_id,
												documentId: documents_id,
												courseId: folder_courseId,
												isCustom: folder_isCustom,
											}}
										/>
									)
								)}
							</div>
						</>
					)}
				</div>
			)}
		</Card>
	);
};

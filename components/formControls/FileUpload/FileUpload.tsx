import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { FileDrop } from "react-file-drop";

// Icons
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

// components
import { Typography, VideoPreview } from "@components";

interface FileUploadProps {
	name: string;
	fileUpload: any;
	label: string;
	acceptFiles: any;
}
export const FileUpload = ({
	name,
	fileUpload,
	label,
	acceptFiles,
}: FileUploadProps) => {
	const [mediaFile, setMediaFile] = useState({
		file: "",
		type: "",
	});

	const [fileName, setFileName] = useState("");
	const [isDrag, setIsDrag] = useState(false);
	const handleRemove = () => {
		setMediaFile({
			file: "",
			type: "",
		});
		fileUpload(name, "");
		setFileName("");
	};

	// Uploading Media
	const handleChange = (event: any, isDragging: boolean) => {
		setIsDrag(false);

		// Gettin file Data
		const FileData = event[0] || event.target.files[0];
		setFileName(FileData.name);
		const reader: any = new FileReader();

		if (reader) {
			reader.onload = () => {
				if (reader.readyState === 2) {
					// Sending file data to field
					fileUpload(name, reader.result.toString());
				}
			};
		}
		// setting file data to state to preview the Data
		acceptFiles.split(", ").includes(FileData.type) &&
			setMediaFile({
				file: URL.createObjectURL(FileData),
				type: FileData.type,
			});
		reader.readAsDataURL(FileData);

		// when user upload the file and after removing upload same file so its doens upload
		// for that purposr removed the value
		!isDragging && (event.target.value = "");
	};

	return (
		<div className="w-full">
			<Typography>
				<span className="font-bold">{label}</span>
			</Typography>

			{/* FileDrop For Drag file */}
			<FileDrop
				onDragOver={() => {
					setIsDrag(true);
				}}
				onDragLeave={() => {
					setIsDrag(false);
				}}
				onDrop={(event) => handleChange(event, true)}
			>
				<div
					className={`w-full h-40 border border-dashed  rounded-lg overflow-hidden ${
						isDrag
							? "bg-primary-light flex justify-center items-center border-primary"
							: "bg-secondary border-gray"
					}`}
				>
					{isDrag ? (
						// Showing text on Drop File
						<Typography variant={"small"} color={"primary"}>
							Drop Here
						</Typography>
					) : mediaFile.file ? (
						<div className="relative w-full h-full">
							{/* For Preview the Media */}
							{mediaFile.type === "video/mp4" ? (
								// Preview Video
								<VideoPreview
									url={mediaFile.file}
									// name={fileName}
								/>
							) : mediaFile.type === "application/pdf" ? (
								// preview PDF
								<div className="flex justify-center items-center w-full h-full">
									<BsFillFileEarmarkPdfFill className="text-5xl text-gray" />
								</div>
							) : (
								// Preview Image
								<img
									className="w-full h-full object-cover"
									src={mediaFile.file}
									alt={name}
								/>
							)}

							{/* Showing details after uploading media */}
							<div
								className={`absolute bottom-0 pt-1.5 pb-5 w-full flex justify-between px-4 ${
									mediaFile.type !== "application/pdf" &&
									"bg-gradient-to-b from-[#00000000] to-black text-white"
								}`}
							>
								<Typography
									color={
										mediaFile.type !== "application/pdf"
											? "white"
											: "gray"
									}
								>
									{fileName.length > 15
										? `${fileName.substring(0, 15)}...`
										: fileName}
								</Typography>
								<div className="flex gap-x-3.5">
									<Typography color={"primary"}>
										<label
											htmlFor={name}
											className="cursor-pointer"
										>
											Change
										</label>
									</Typography>
									<Typography color={"error"}>
										<span
											className="cursor-pointer"
											onClick={handleRemove}
										>
											Remove
										</span>
									</Typography>
								</div>
							</div>
						</div>
					) : (
						<div
							className={`w-full h-full flex justify-center items-center flex-col`}
						>
							<Typography variant={"small"} color={"grayLight"}>
								Drop File Here
							</Typography>
							<Typography variant={"small"} color={"grayLight"}>
								Or
							</Typography>
							<Typography variant={"small"} color={"textLink"}>
								<label
									htmlFor={name}
									className="cursor-pointer hover:underline"
								>
									Browse
								</label>
							</Typography>
						</div>
					)}
				</div>

				{/* Formik fieid, made this hidden and and custom design */}
				<Field name={name}>
					{(props: any) => {
						return (
							<>
								<input
									type="file"
									className="hidden"
									onChange={(event) => {
										handleChange(event, false);
									}}
									id={name}
									accept={acceptFiles}
								/>
								{props.meta.value ||
								(props.meta.touched && props.meta.error) ? (
									<Typography
										variant={"small"}
										color={"error"}
									>
										{props.meta.error}
									</Typography>
								) : null}
							</>
						);
					}}
				</Field>
			</FileDrop>
		</div>
	);
};

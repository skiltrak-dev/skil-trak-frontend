import React, { useEffect, useState } from "react";
import {
	Menu,
	MenuButton,
	MenuDivider,
	MenuHeader,
	MenuItem,
} from "@szhsin/react-menu";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";

// components
import { ConfirmActionView,DeleteActionPopup,Popup } from "components";

// redux
// import {
//   useChangeEmployeeTaskPriorityMutation,
//   useDeleteEmployeeTaskMutation,
// } from "redux/query";

// Colors
import { Colors } from "utills/colors/Colors";

// styles
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export const ScheduleCardAction = ({
	items,
	deleteTask,
	changePriority,
	deleteTaskResult,
}) => {
	const [popUpSubtitle, setPopUpSubtitle] = useState(
		"Please wait for a moment"
	);

	const [removeTask, setRemoveTask] = useState({
		isRemove: false,
		id: "",
	});

	useEffect(() => {
		deleteTaskResult.isLoading &&
			setTimeout(() => {
				setPopUpSubtitle("Your internet connection is too slow!");
			}, 3000);
	}, [deleteTaskResult.isLoading]);

	// deleteJob
	const deleteJob = async () => {
		setRemoveTask({
			isRemove: false,
			id: "",
		});
		await deleteTask(removeTask.id);
	};

	const priority = [
		{
			priority: "Low",
			color: Colors.success,
		},
		{
			priority: "Medium",
			color: Colors.info,
		},
		{
			priority: "High",
			color: Colors.error,
		},
	];
	return (
		<div className="w-full absolute top-0 right-0">
			<Menu
				menuButton={
					<MenuButton className="absolute right-0 top-0">
						<MdKeyboardArrowDown />
					</MenuButton>
				}
				transition
			>
				<MenuHeader className="text-xs">priority</MenuHeader>
				{priority.map((priority, i) => (
					<MenuItem key={i}>
						<div
							style={{
								color: `${priority.color}`,
								width: "100%",
							}}
							className="text-xs"
							onClick={async (event) => {
								await changePriority({
									id: items.id,
									priority:
										event.target.textContent.toLowerCase(),
								});
							}}
						>
							{priority.priority}
						</div>
					</MenuItem>
				))}
				<MenuDivider />
				<MenuHeader className="text-xs">action</MenuHeader>

				<MenuItem>
					<div
						style={{ color: Colors.error, width: "100%" }}
						className="text-xs"
						onClick={() =>
							setRemoveTask({
								isRemove: true,
								id: items.id,
							})
						}
					>
						Delete
					</div>
				</MenuItem>
			</Menu>

			{removeTask.isRemove && (
				<DeleteActionPopup
					title={"Delete Schedule"}
					description={
						"Your Schedule will be deleted permanently. Do you want to continue"
					}
					onCancel={() =>
						setRemoveTask({
							isRemove: false,
							id: "",
						})
					}
					onConfirm={() => {
						deleteJob(removeTask.id);
					}}
				/>
			)}

			{/* Showing popup when Schedule is deleting */}
			{deleteTaskResult.isLoading && (
				<div className="fixed top-1/2 left-1/2 w-465 -translate-x-1/2 -translate-y-1/2">
					<Popup
						title={"Deleting Schedule"}
						subtitle={popUpSubtitle}
						titleColor={"error"}
						descColor={"gray"}
						shadow={4}
					/>
				</div>
			)}
		</div>
	);
};

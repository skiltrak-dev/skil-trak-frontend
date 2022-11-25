import React from "react";

// components
import { Typography } from "components";

// functions
import { getAge } from "@utils";

export const StudentProfileData = ({ data }:any) => {
	return (
		<>
			<div className="border-b border-secondary-dark pb-1">
				<Typography variant={"muted"} color={"gray"}>
					Student Profile
				</Typography>
			</div>

			{/* Appointment Details */}
			<div className="grid grid-cols-2 gap-y-4 py-4">
				{/* Job Title */}
				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Student Name
					</Typography>
					<Typography color={"black"}>{data?.user?.name}</Typography>
				</div>

				{/* Employment Type */}
				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Email
					</Typography>
					<Typography color={"black"}>{data?.user?.email}</Typography>
				</div>

				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Family Name
					</Typography>
					<Typography color={"black"}>{data?.familyName}</Typography>
				</div>

				{/*  Salary */}
				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Date of Birth
					</Typography>
					<Typography color={"black"}>{data?.dob}</Typography>
				</div>

				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Age
					</Typography>
					<Typography color={"black"}>{getAge(data?.dob)}</Typography>
				</div>

				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Phone
					</Typography>
					<Typography color={"black"}>{data?.phone}</Typography>
				</div>

				{/* Address */}
				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Address 1
					</Typography>
					<Typography color={"black"}>
						{data?.addressLine1}
					</Typography>
				</div>

				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Address 2
					</Typography>
					<Typography color={"black"}>
						{data?.addressLine2}
					</Typography>
				</div>

				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						State
					</Typography>
					<Typography color={"black"}>{data?.state}</Typography>
				</div>
				<div className="flex flex-col gap-y-1">
					<Typography variant={"muted"} color={"gray"}>
						Suburb
					</Typography>
					<Typography color={"black"}>{data?.suburb}</Typography>
				</div>
			</div>
		</>
	);
};

import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";

// components
import {
	Card,
	Button,
	Typography,
	GoBackButton,
	SelectFieldOption,
} from "components";
import { RightSidebarData } from "./components";

// hooks
import { useContextBar } from "hooks";

// utills
import { Console } from "@utils";

export const BrowseCandidates = () => {
	const { setContent } = useContextBar();

	useEffect(() => {
		setContent(
			<>
				<RightSidebarData />
			</>
		);
	}, [setContent]);

	const initialValues = {
		sector: {},
		course: {},
		city: {},
	};

	const validationSchema = yup.object({
		// businessName: yup.string().required("Some error occured!"),
		// abn: yup.string().required("Some error occured!"),
		// businessPhoneNumber: yup.string().required("Some error occured!"),
	});

	const onSubmit = (values) => {
		Console("values", values);
	};
	return (
		<div>
			<GoBackButton link={"jobs"}>Back To Jobs</GoBackButton>

			{/*  */}
			<Card mt={6}>
				<Typography variant={"subtitle"}>
					Candidate Matching Criteria
				</Typography>

				{/*  */}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{({ touched, errors, setFieldValue }) => {
						return (
							<Form>
								<div className="grid grid-cols-2 gap-x-8 gap-y-2 my-4">
									<SelectFieldOption
										label={"Sector"}
										fileupload={setFieldValue}
										name={"placementCoordinator"}
										options={[
											{ value: "apple", label: "Apple" },
											{
												value: "banana",
												label: "Banana",
											},
											{ value: "melon", label: "Melon" },
										]}
									/>

									<SelectFieldOption
										label={"Course"}
										fileupload={setFieldValue}
										name={"appointmentType"}
										options={[
											{ value: "apple", label: "Apple" },
											{
												value: "banana",
												label: "Banana",
											},
											{ value: "melon", label: "Melon" },
										]}
									/>

									<SelectFieldOption
										label={"City"}
										fileupload={setFieldValue}
										name={"appointmentDate"}
										options={[
											{ value: "apple", label: "Apple" },
											{
												value: "banana",
												label: "Banana",
											},
											{ value: "melon", label: "Melon" },
										]}
									/>
								</div>

								<Button
									border={"2"}
									borderColor={"primary"}
									bgColor={"primary"}
									type={"submit"}
								>
									Apply Criteria
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Card>

			{/*  */}
			<Card mt={6}>
				<Typography variant={"subtitle"}>
					Suitable Candidates
				</Typography>
				<Typography variant={"muted"} color={"gray"}>
					These candidates are being shown based on your company
					preferences
				</Typography>

				{/*  */}
				<div className="mt-4">Candidates</div>
			</Card>
		</div>
	);
};

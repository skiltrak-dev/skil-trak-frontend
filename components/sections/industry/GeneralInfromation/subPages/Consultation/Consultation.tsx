import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

// Icons
import { BsFillCheckCircleFill } from "react-icons/bs";

// components
import {
	Action,
	Button,
	GoBackButton,
	InputField,
	Card,
	SelectFieldOption,
	Typography,
} from "components";
import { RightSidebarData } from "./components";

// functions
import { Console } from "utills/functions/ShowConsole";

// Context
import { useContextBar } from "hooks";

export const Consultation = () => {
	const navigate = useNavigate();
	const [isConsulted, setIsConsulted] = useState(false);
	const { setContent } = useContextBar();

	useEffect(() => {
		setContent(
			<>
				<RightSidebarData />
			</>
		);
	}, [setContent]);

	useEffect(() => {
		isConsulted &&
			setTimeout(() => {
				navigate("/general-information");
			}, 2000);
	}, [isConsulted, navigate]);

	const initialValues = {
		bsb: "",
		hours: "",
		accountName: "",
		accountNumber: "",
		selectYourCoordinator: {},
	};

	const validationSchema = yup.object({
		// businessName: yup.string().required("Some error occured!"),
		// abn: yup.string().required("Some error occured!"),
		// businessPhoneNumber: yup.string().required("Some error occured!"),
	});

	const onSubmit = (values) => {
		// <Navigate to="/privew-industry" />;
		setIsConsulted(true);
		Console("values", values);
	};
	return isConsulted ? (
		<Card>
			<Action
				Icon={BsFillCheckCircleFill}
				title={"Successfully enrolled for Industry Consultation"}
				description={"You will be redirected to jobs in a moment."}
				iconsColor={"success"}
			/>
		</Card>
	) : (
		<>
			<GoBackButton link={"/"}>Back To Dashboard</GoBackButton>

			{/*  */}
			<Card mt={6}>
				<Typography variant={"subtitle"}>
					Industry Consultation
				</Typography>

				{/*  */}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(props) => {
						const { touched, errors, setFieldValue } = props;
						return (
							<Form>
								<div className="w-full md:w-1/2 my-4">
									<SelectFieldOption
										label={"Select Your Coordinator"}
										fileupload={setFieldValue}
										name={"selectYourCoordinator"}
										options={[
											{
												value: "chocolate",
												label: "Chocolate",
											},
											{
												value: "strawberry",
												label: "Strawberry",
											},
											{
												value: "vanilla",
												label: "Vanilla",
											},
										]}
									/>
								</div>

								<div className="grid grid-cols-2 gap-2 mb-4">
									<InputField
										label={"Hours/Session"}
										name={"hours"}
										placeholder={"Some Text Here..."}
										touched={touched}
										errors={errors}
										inputDescription={
											"Allocated Hours Per Session (Min 2 Hours)"
										}
									/>
									<div className="flex flex-col mt-1">
										<Typography variant={"label"}>
											Chargeable Fee/Hour
										</Typography>
										<Typography variant={"label"}>
											$55
										</Typography>
									</div>
								</div>

								<Typography
									variant={"smallText"}
									color={"gray"}
								>
									Company Bank Details
								</Typography>

								<div className="grid grid-cols-2 gap-x-4 my-4">
									<InputField
										label={"Account Name"}
										name={"accountName"}
										placeholder={"Some Text Here..."}
										touched={touched}
										errors={errors}
									/>
									<InputField
										label={"BSB"}
										name={"bsb"}
										placeholder={"Some Text Here..."}
										touched={touched}
										errors={errors}
									/>
								</div>

								<div className="mb-4">
									<InputField
										label={"Account Number"}
										name={"accountNumber"}
										placeholder={"Some Text Here..."}
										touched={touched}
										errors={errors}
									/>
								</div>

								<Button bgColor={"primary"} type={"submit"}>
									Save
								</Button>
							</Form>
						);
					}}
				</Formik>
			</Card>
		</>
	);
};

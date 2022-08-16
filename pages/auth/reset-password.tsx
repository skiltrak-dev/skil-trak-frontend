import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import * as Yup from "yup";
import { Form, Formik } from "formik";

import { AuthLayout } from "@layouts";
import { Animations } from "@animations";
import {
	Button,
	TextInput,
	Typography,
	BackButton,
	LottieAnimation,
} from "@components";

const ResetPassword: NextPage = () => {
	const router = useRouter();

	const [emailSent, setEmailSent] = useState(false);

	const initialValues = {
		newPassword: "",
		confirmPassword: "",
	};

	const validationSchema = Yup.object({
		newPassword: Yup.string().required("Password is required!"),
		confirmPassword: Yup.string().required("Confirm your password!"),
	});

	const onSubmit = async (values: any) => {
		// send reset password email
		setEmailSent(true);
	};

	const onBackToLogin = () => {
		router.push("/auth/login");
	};

	return (
		<AuthLayout type="log-in">
			<div className="h-[80vh] flex justify-center items-center">
				{!emailSent ? (
					<div className="w-3/5 mx-auto flex items-center justify-between">
						<div className="flex flex-col flex-grow">
							<div className="w-full mb-8">
								<BackButton />
								<Typography variant={"h3"}>
									Reset Your Password
								</Typography>
							</div>

							<Typography>
								Please provide us with your new password.
							</Typography>

							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{({ dirty, isValid }) => {
									return (
										<Form className="mt-2 w-full">
											<div className="">
												<TextInput
													label={"New Password"}
													name={"newPassword"}
													type={"password"}
													placeholder={
														"Your New Password Here..."
													}
													validationIcons
													required
												/>

												<TextInput
													label={"Confirm Password"}
													name={"confirmPassword"}
													type={"password"}
													placeholder={
														"Confirm Your Password Here..."
													}
													validationIcons
													required
												/>
											</div>

											<div className="mt-4 flex items-center justify-between">
												<Button
													submit
													disabled={
														!(isValid && dirty)
													}
													loading={false}
													text={"Update Password"}
												/>
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>

						<div className="h-48 w-px bg-gray-300 mx-8"></div>

						<div>
							<LottieAnimation
								height={400}
								width={350}
								animation={Animations.Auth.Login.ResetPassword}
							/>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center w-2/5">
						<LottieAnimation
							height={240}
							width={180}
							loop={false}
							animation={Animations.Common.Actions.Success}
						/>

						<div className="mt-2">
							<Typography variant="h3" center>
								Your Password Is Updated
							</Typography>
						</div>

						<div className="mt-2">
							<Typography center>
								Your password is updated, you can login now with
								new password.
							</Typography>
						</div>

						<div className="mt-16">
							<Button
								variant="secondary"
								outline
								onClick={onBackToLogin}
							>
								Login
							</Button>
						</div>
					</div>
				)}
			</div>
		</AuthLayout>
	);
};

export default ResetPassword;

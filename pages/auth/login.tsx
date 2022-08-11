import { useEffect, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import type { NextPage } from "next";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import {
	Button,
	Checkbox,
	TextInput,
	Typography,
	AccountStatus,
	LottieAnimation,
} from "@components";
import { AuthUtils } from "@utils";
import { AuthLayout } from "@layouts";
import { Animations } from "@animations";
import { LoginCredentials, StatusType } from "@types";

import { AuthApi } from "@queries";

const Login: NextPage = () => {
	const router = useRouter();

	const [login, loginResult] = AuthApi.useLoginMutation();
	const [checkStatus, checkStatusResult] = AuthApi.useCheckStatusMutation();

	const [requested, setRequested] = useState(false);
	const [rejected, setRejected] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const initialValues: LoginCredentials = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid Email")
			.required("Email is required!"),
		password: Yup.string().required("Password is required"),
	});

	const onLogin = (status: StatusType) => {
		switch (status) {
			case "pending":
				setRequested(true);
				break;
			case "approved":
				router.push("/");
				break;
			case "rejected":
				setRejected(true);
				break;
		}
	};

	useEffect(() => {
		if (AuthUtils.isAuthenticated()) {
			checkStatus({});
		}
	}, []);

	useEffect(() => {
		if (loginResult.isSuccess) {
			if (loginResult.data) {
				AuthUtils.setToken(loginResult.data.access_token);
				onLogin(loginResult.data.status);
			}
		}
	}, [loginResult.isSuccess]);

	useEffect(() => {
		if (checkStatusResult.isSuccess) {
			onLogin(checkStatusResult.data.status);
		}
	}, [checkStatusResult]);

	const onSubmit = async (values: LoginCredentials) => {
		await login(values);
	};

	return (
		<AuthLayout type="log-in">
			{requested && <AccountStatus status={"pending"} />}
			{rejected && <AccountStatus status={"rejected"} />}

			{!requested && !rejected && (
				<div className="w-3/5 mx-auto flex items-center justify-between">
					<div className="flex flex-col items-center flex-grow">
						<div className="w-full mb-8">
							<Typography variant={"h3"}>
								Login To Your Account
							</Typography>
						</div>

						{loginResult.isError && (
							<p className="text-sm text-error w-full border border-error px-2 py-1 rounded shadow text-center">
								Invalid Email or Password
							</p>
						)}

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
												label={"Email"}
												name={"email"}
												type={"email"}
												placeholder={
													"Your Email Here..."
												}
												validationIcons
												required
											/>

											<TextInput
												label={"Password"}
												name={"password"}
												type={"password"}
												placeholder={
													"Your Password Here..."
												}
												validationIcons
												required
											/>
										</div>

										<div className="mb-6">
											<Checkbox
												name={"rememberMe"}
												label={"Remember Me"}
											/>
										</div>

										<div className="mt-4 flex items-center justify-between">
											<Button
												submit
												disabled={!(isValid && dirty)}
												loading={loginResult.isLoading}
											>
												Login
											</Button>

											<Link
												href="#"
												className={
													"text-sm font-semibold text-gray hover:text-link transition-all duration-300"
												}
											>
												Forgot Password?
											</Link>
										</div>
									</Form>
								);
							}}
						</Formik>

						<div className="mt-16">
							<Typography variant="muted">
								Don&apos;t have account?{" "}
								<Link href="/signup" className="text-link">
									Please Create Account
								</Link>
							</Typography>
						</div>
					</div>

					<div className="h-48 w-px bg-gray-300 mx-8"></div>

					<div className="">
						<LottieAnimation
							height={550}
							width={450}
							animation={Animations.Auth.Login.Simple}
						/>
					</div>
				</div>
			)}
		</AuthLayout>
	);
};

export default Login;

import {
	Checkbox,
	Switch,
	TextArea,
	TextInput,
	RadioButton,
	RadioGroup,
	FileUpload,
	Select,
} from "@components/inputs";
import { FormProvider, useForm } from "react-hook-form";

export const Form = () => {
	const formMethods = useForm({
		mode: "all",
	});
	const onSubmit = (data: any) => {
		// console.log("submitting...", data);
	};

	return (
		<>
			<FormProvider {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)}>
					<TextInput
						name="firstName"
						label="First Name"
						onChange={(e: any) => {
							// console.log(
							// 	":::: Text Input Changed",
							// 	e.target.value
							// );
						}}
						helpText={"Some help would be nice"}
						placeholder={"Your good name here"}
						required
						tooltip="This is the best tool tip I have"
						rules={{
							required: "You must enter this name",
						}}
						validationIcons
					/>

					<TextArea
						name="description"
						label="Description"
						onChange={(e: any) => {
							// console.log(
							// 	":::: Text Area Changed",
							// 	e.target.value
							// );
						}}
						helpText={"Some help would be nice"}
						placeholder={"Your good text here"}
						required
						tooltip="This is the best tool tip I have"
						rules={{
							required: "You must enter this text",
						}}
						validationIcons
					/>

					<Switch
						name="testSwitch"
						onChange={(e: any) => {
							// console.log(
							// 	":::: SWITCH CHANGED",
							// 	e.target.checked,
							// 	e.target.value
							// );
						}}
						defaultChecked
					/>

					<Checkbox
						name="testCheckbox"
						onChange={(e: any) => {
							// console.log(
							// 	":::: Checkbox CHANGED",
							// 	e.target.checked,
							// 	e.target.value
							// );
						}}
						label={"Some weird name here"}
						value="I got some value"
						defaultChecked
					/>

					<RadioButton
						name="testRadio"
						onChange={(e: any) => {
							// console.log(
							// // 	":::: Checkbox CHANGED",
							// // 	e.target.checked,
							// // 	e.target.value
							// // );
						}}
						label={"The great label"}
						value="All i wana say that they dont really care about us"
					/>

					<RadioButton
						name="testRadio"
						onChange={(e: any) => {
							// console.log(
							// 	":::: Checkbox CHANGED",
							// 	e.target.checked,
							// 	e.target.value
							// );
						}}
						label={"Stupid things"}
						value="Stupid things"
					/>

					<RadioGroup
						name="groupOfRadio"
						label={"Do the dew"}
						options={[
							{
								label: "Bela",
								value: "Dona",
							},
							{
								label: "Dela",
								value: "La Cruise",
							},
							{
								label: "Whato",
								value: "Getto",
							},
						]}
						onChange={(e: any) => {
							// console.log(
							// 	"::: GRATO",
							// 	e.target.checked,
							// 	e.target.value
							// );
						}}
					/>

					<FileUpload
						name="fileUpload"
						// onChange={(e: any) => {
						// 	console.log("::: FILE UPLOAD", e.target.value);
						// }}
					/>
					<Select
						name="someSelect"
						options={[
							{
								label: "Option 1",
								value: "option-1",
							},
							{
								label: "Option 2",
								value: "option-2",
							},
							{
								label: "Option 3",
								value: "option-3",
							},
						]}
						onChange={(e: any) => {
							console.log(":::: CHANGED", e);
						}}
					/>
					<button type="submit">Submit</button>
				</form>
			</FormProvider>
		</>
	);
};

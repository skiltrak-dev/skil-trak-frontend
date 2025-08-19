// components/FeedbackForm/types.ts

import * as yup from "yup";
import { InferType } from "yup";



export type FormData = InferType<typeof formSchema>;
// Yup validation schema
export const formSchema = yup.object({
	overallSatisfaction: yup
		.string()
		.required("Please select your satisfaction level"),

	enjoyedMost: yup.string().optional().defined(),

	challenges: yup.string().optional().defined(),

	skillsGained: yup
		.string()
		.required("Please indicate if you gained relevant skills"),

	skillsExamples: yup.string().optional().defined(),

	confidence: yup.string().required("Please select your confidence level"),

	professionalism: yup
		.number()
		.required("Please rate professionalism")
		.min(1, "Please rate professionalism"),

	communication: yup
		.number()
		.required("Please rate communication")
		.min(1, "Please rate communication"),

	supportMentorship: yup
		.number()
		.required("Please rate support & mentorship")
		.min(1, "Please rate support & mentorship"),

	learningOpportunities: yup
		.number()
		.required("Please rate learning opportunities")
		.min(1, "Please rate learning opportunities"),

	recommendEmployer: yup
		.string()
		.required("Please indicate if you would recommend this employer"),

	employerFeedback: yup.string().optional().defined(),

	skilltrakSupport: yup
		.string()
		.required("Please rate your satisfaction with Skiltrak support"),

	skilltrakCommunication: yup
		.string()
		.required("Please rate the clarity of Skiltrak communication"),

	skilltrakImprovement: yup.string().optional().defined(),

	finalComments: yup.string().optional().defined(),
});

// export type FormData = InferType<typeof formSchema>;
export const getStepSchema = (stepIndex: number, stepsConfig: any[]) => {
	const stepFields =
		stepsConfig[stepIndex]?.fields?.map((f: any) => f.key) || [];
	const stepSchemaShape: Partial<Record<keyof FormData, yup.AnySchema>> = {};

	stepFields.forEach((field: any) => {
		switch (field) {
			case "overallSatisfaction":
				stepSchemaShape.overallSatisfaction = yup
					.string()
					.required("Please select your satisfaction level");
				break;
			case "enjoyedMost":
				stepSchemaShape.enjoyedMost = yup.string().optional();
				break;
			case "challenges":
				stepSchemaShape.challenges = yup.string().optional();
				break;
			case "skillsGained":
				stepSchemaShape.skillsGained = yup
					.string()
					.required("Please indicate if you gained relevant skills");
				break;
			case "skillsExamples":
				stepSchemaShape.skillsExamples = yup.string().optional();
				break;
			case "confidence":
				stepSchemaShape.confidence = yup
					.string()
					.required("Please select your confidence level");
				break;
			case "professionalism":
				stepSchemaShape.professionalism = yup
					.number()
					.min(1, "Please rate professionalism");
				break;
			case "communication":
				stepSchemaShape.communication = yup
					.number()
					.min(1, "Please rate communication");
				break;
			case "supportMentorship":
				stepSchemaShape.supportMentorship = yup
					.number()
					.min(1, "Please rate support & mentorship");
				break;
			case "learningOpportunities":
				stepSchemaShape.learningOpportunities = yup
					.number()
					.min(1, "Please rate learning opportunities");
				break;
			case "recommendEmployer":
				stepSchemaShape.recommendEmployer = yup
					.string()
					.required(
						"Please indicate if you would recommend this employer"
					);
				break;
			case "employerFeedback":
				stepSchemaShape.employerFeedback = yup.string().optional();
				break;
			case "skilltrakSupport":
				stepSchemaShape.skilltrakSupport = yup
					.string()
					.required(
						"Please rate your satisfaction with Skiltrak support"
					);
				break;
			case "skilltrakCommunication":
				stepSchemaShape.skilltrakCommunication = yup
					.string()
					.required(
						"Please rate the clarity of Skiltrak communication"
					);
				break;
			case "skilltrakImprovement":
				stepSchemaShape.skilltrakImprovement = yup.string().optional();
				break;
			case "finalComments":
				stepSchemaShape.finalComments = yup.string().optional();
				break;
		}
	});

	return yup.object(stepSchemaShape);
};

export interface ValidationState {
	[key: string]: { isValid: boolean; message?: string };
}

export type FieldType = "radio" | "textarea" | "star";

export interface FieldConfig {
	key: keyof FormData;
	type: FieldType;
	label: string;
	placeholder?: string;
	helpText?: string;
	options?: Array<{
		value: string;
		label: string;
		icon?: any;
		colorClass?: string;
	}>;
	color?: string;
}

export interface StepConfig {
	id: string;
	title: string;
	description?: string;
	icon?: any;
	color?: string;
	fields: FieldConfig[];
}

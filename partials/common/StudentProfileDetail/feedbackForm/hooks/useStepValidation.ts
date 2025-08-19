import { useCallback } from "react";
import { UseFormTrigger } from "react-hook-form";
import { FormData, getStepSchema } from "../types";

export const useStepValidation = (
	trigger: UseFormTrigger<FormData>,
	stepsConfig: any[]
) => {
	const validateCurrentStep = useCallback(
		async (stepIndex: number): Promise<boolean> => {
			const step = stepsConfig[stepIndex];
			if (!step) return true;

			// Get field names for current step
			const stepFields = step.fields.map(
				(f: any) => f.key
			) as (keyof FormData)[];

			// Trigger validation only for current step fields
			const result = await trigger(stepFields);
			return result;
		},
		[trigger, stepsConfig]
	);

	const validateAllSteps = useCallback(async (): Promise<boolean> => {
		// Validate all fields at once
		const result = await trigger();
		return result;
	}, [trigger]);

	return {
		validateCurrentStep,
		validateAllSteps,
	};
};

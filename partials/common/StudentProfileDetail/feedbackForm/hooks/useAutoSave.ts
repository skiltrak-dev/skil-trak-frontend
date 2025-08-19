import { useEffect, useRef } from "react";
import { UseFormWatch } from "react-hook-form";
import { FormData } from "../types";

export const useAutoSave = (
	watch: UseFormWatch<FormData>,
	onAutoSave: (data: FormData) => Promise<void>,
	delay = 2000
) => {
	const timer = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const subscription = watch((data, { name, type }) => {
			// Only auto-save when user actually changes something
			if (type === "change") {
				// Check if there's meaningful data to save
				const hasValue = Object.values(data).some(
					(v) => v !== "" && v !== 0 && v !== null && v !== undefined
				);

				if (!hasValue) return;

				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					onAutoSave(data as FormData).catch(console.error);
				}, delay);
			}
		});

		return () => {
			subscription.unsubscribe();
			if (timer.current) clearTimeout(timer.current);
		};
	}, [watch, onAutoSave, delay]);
};

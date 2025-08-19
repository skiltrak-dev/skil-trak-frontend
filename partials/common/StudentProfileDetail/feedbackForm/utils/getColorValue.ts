// components/FeedbackForm/utils/getColorValue.ts

export const getColorValue = (colorClass?: string) => {
	const colorMap: { [key: string]: string } = {
		emerald: "#10b981",
		green: "#22c55e",
		yellow: "#eab308",
		orange: "#f97316",
		red: "#ef4444",
		blue: "#3b82f6",
		"brand-primary": "#0ea5e9",
		"brand-secondary": "#7c3aed",
		"brand-accent": "#e11d48",
	};

	if (!colorClass) return "#044866";

	for (const [key, value] of Object.entries(colorMap)) {
		if (colorClass.includes(key)) return value;
	}

	return "#044866";
};

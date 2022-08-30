export const RequiredStar = ({ color }: { color?: string }) => {
	return <span className={`${color || "text-primary"}`}>*</span>;
};

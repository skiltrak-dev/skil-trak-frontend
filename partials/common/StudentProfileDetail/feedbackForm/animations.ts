// components/FeedbackForm/animations.ts

export const stepVariants = {
	hidden: { opacity: 0, x: 100 },
	visible: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

export const fadeUp: any = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: { duration: 0.45, ease: [0.42, 0, 0.58, 1] },
};

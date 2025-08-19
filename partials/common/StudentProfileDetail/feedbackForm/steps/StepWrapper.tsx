// components/FeedbackForm/components/StepWrapper.tsx

"use client";
import React from "react";
import { motion } from "motion/react";
import { fadeUp } from "../animations";

export const StepWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={fadeUp.initial}
			animate={fadeUp.animate}
			exit={fadeUp.exit}
			transition={fadeUp.transition}
			className="w-full"
		>
			{children}
		</motion.div>
	);
};

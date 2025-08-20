"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { getColorValue } from "../utils/getColorValue";

export const CompactRadioGroup = ({
	value,
	onValueChange,
	options,
	name,
	validation,
}: any) => {
	return (
		<div className="space-y-2">
			<div className="flex flex-wrap gap-3">
				{options.map((option: any, index: number) => {
					const isSelected = value === option.value;
					return (
						<motion.button
							key={option.value}
							type="button"
							onClick={() => onValueChange(option.value)}
							className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 text-sm flex items-center gap-2 shadow-sm hover:shadow-md min-w-fit ${
								isSelected ? "text-white" : "bg-white/80"
							}`}
							style={
								isSelected
									? {
											backgroundColor: getColorValue(
												option.colorClass
											),
											borderColor: getColorValue(
												option.colorClass
											),
											boxShadow: `0 0 0 2px ${getColorValue(
												option.colorClass
											)}33`,
									  }
									: {}
							}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.03 }}
						>
							<span
								className={
									isSelected ? "text-white" : "text-gray-600"
								}
							>
								{option.icon}
							</span>
							<span
								className={`font-medium ${
									isSelected ? "text-white" : "text-gray-700"
								}`}
							>
								{option.label}
							</span>
						</motion.button>
					);
				})}
			</div>

			{validation && !validation.isValid && validation.message && (
				<motion.p
					className="text-sm text-red-500 flex items-center gap-1"
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
				>
					<AlertCircle className="w-4 h-4" />
					{validation.message}
				</motion.p>
			)}
		</div>
	);
};

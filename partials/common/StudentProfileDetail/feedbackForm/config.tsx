import React from "react";
import {
	Heart,
	ThumbsUp,
	Minus,
	ThumbsDown,
	AlertCircle,
	CheckCircle2,
	CheckCircle,
	Trophy,
	Clock,
	Sparkles,
	ClipboardList,
	BookOpen,
	Building2,
	Users,
	CheckCircle as CheckCircleIcon,
} from "lucide-react";

import type { StepConfig } from "./types";

export const satisfactionOptions = [
	{
		value: "very-satisfied",
		label: "Very Satisfied",
		icon: <Heart className="w-4 h-4" />,
		colorClass: "emerald",
	},
	{
		value: "satisfied",
		label: "Satisfied",
		icon: <ThumbsUp className="w-4 h-4" />,
		colorClass: "green",
	},
	{
		value: "neutral",
		label: "Neutral",
		icon: <Minus className="w-4 h-4" />,
		colorClass: "yellow",
	},
	{
		value: "dissatisfied",
		label: "Dissatisfied",
		icon: <ThumbsDown className="w-4 h-4" />,
		colorClass: "orange",
	},
	{
		value: "very-dissatisfied",
		label: "Very Dissatisfied",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "red",
	},
];

export const agreementOptions = [
	{
		value: "strongly-agree",
		label: "Strongly Agree",
		icon: <CheckCircle2 className="w-4 h-4" />,
		colorClass: "emerald",
	},
	{
		value: "agree",
		label: "Agree",
		icon: <CheckCircle className="w-4 h-4" />,
		colorClass: "green",
	},
	{
		value: "neutral-skills",
		label: "Neutral",
		icon: <Minus className="w-4 h-4" />,
		colorClass: "yellow",
	},
	{
		value: "disagree",
		label: "Disagree",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "orange",
	},
	{
		value: "strongly-disagree",
		label: "Strongly Disagree",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "red",
	},
];

export const confidenceOptions = [
	{
		value: "very-confident",
		label: "Very Confident",
		icon: <Trophy className="w-4 h-4" />,
		colorClass: "emerald",
	},
	{
		value: "confident",
		label: "Confident",
		icon: <ThumbsUp className="w-4 h-4" />,
		colorClass: "green",
	},
	{
		value: "neutral-confidence",
		label: "Neutral",
		icon: <Minus className="w-4 h-4" />,
		colorClass: "yellow",
	},
	{
		value: "slightly-confident",
		label: "Slightly Confident",
		icon: <Clock className="w-4 h-4" />,
		colorClass: "orange",
	},
	{
		value: "not-confident",
		label: "Not Confident",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "red",
	},
];

export const recommendOptions = [
	{
		value: "yes",
		label: "Yes",
		icon: <Heart className="w-4 h-4" />,
		colorClass: "emerald",
	},
	{
		value: "maybe",
		label: "Maybe",
		icon: <Clock className="w-4 h-4" />,
		colorClass: "blue",
	},
	{
		value: "no",
		label: "No",
		icon: <ThumbsDown className="w-4 h-4" />,
		colorClass: "red",
	},
];

export const skillTrackSatisfactionOptions = satisfactionOptions.map((opt) => ({
	...opt,
	value: opt.value + "-skiltrak",
}));

export const clarityOptions = [
	{
		value: "very-clear",
		label: "Very Clear",
		icon: <CheckCircle2 className="w-4 h-4" />,
		colorClass: "emerald",
	},
	{
		value: "clear",
		label: "Clear",
		icon: <CheckCircle className="w-4 h-4" />,
		colorClass: "green",
	},
	{
		value: "neutral-clear",
		label: "Neutral",
		icon: <Minus className="w-4 h-4" />,
		colorClass: "yellow",
	},
	{
		value: "unclear",
		label: "Unclear",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "orange",
	},
	{
		value: "very-unclear",
		label: "Very Unclear",
		icon: <AlertCircle className="w-4 h-4" />,
		colorClass: "red",
	},
];

export const stepsConfig: StepConfig[] = [
	{
		id: "step-1",
		title: "Overall Placement Experience",
		description:
			"Tell us about your overall placement experience and what made it special",
		icon: <ClipboardList className="w-5 h-5" />,
		color: "brand-primary",
		fields: [
			{
				key: "overallSatisfaction",
				type: "radio",
				label: "1. How satisfied are you with your placement experience overall?",
				options: satisfactionOptions,
				color: "brand-primary",
			},
			{
				key: "enjoyedMost",
				type: "textarea",
				label: "2. What did you enjoy most about your placement?",
				placeholder: "Share the highlights...",
				helpText:
					"Think about specific projects, people, or learning opportunities that stood out to you",
				color: "brand-primary",
			},
			{
				key: "challenges",
				type: "textarea",
				label: "3. Were there any challenges you faced during your placement? How were they addressed?",
				placeholder:
					"Describe any challenges and how they were overcome...",
				helpText:
					"This helps us understand how well support systems worked",
				color: "brand-primary",
			},
		],
	},
	{
		id: "step-2",
		title: "Learning & Skills Development",
		description:
			"Share details about your learning journey and the skills you've developed",
		icon: <BookOpen className="w-5 h-5" />,
		color: "brand-secondary",
		fields: [
			{
				key: "skillsGained",
				type: "radio",
				label: "4. I gained practical skills and knowledge relevant to my course",
				options: agreementOptions,
				color: "brand-secondary",
			},
			{
				key: "skillsExamples",
				type: "textarea",
				label: "5. Please give examples of the key skills or knowledge you developed",
				placeholder:
					"List specific skills, tools, or knowledge you gained...",
				helpText:
					"Be specific - this helps other students understand what to expect",
				color: "brand-secondary",
			},
			{
				key: "confidence",
				type: "radio",
				label: "6. How confident do you feel about applying what you've learned in a real work setting?",
				options: confidenceOptions,
				color: "brand-secondary",
			},
		],
	},
	{
		id: "step-3",
		title: "Host Employer Feedback",
		description:
			"Rate your host employer and share your experience working with them",
		icon: <Building2 className="w-5 h-5" />,
		color: "brand-accent",
		fields: [
			{
				key: "professionalism",
				type: "star",
				label: "Professionalism",
				placeholder: "How professional was the work environment?",
				color: "brand-accent",
			},
			{
				key: "communication",
				type: "star",
				label: "Communication",
				placeholder: "How clear and helpful was communication?",
				color: "brand-accent",
			},
			{
				key: "supportMentorship",
				type: "star",
				label: "Support & Mentorship",
				placeholder: "How well were you supported and mentored?",
				color: "brand-accent",
			},
			{
				key: "learningOpportunities",
				type: "star",
				label: "Learning Opportunities",
				placeholder: "How many learning opportunities were provided?",
				color: "brand-accent",
			},
			{
				key: "recommendEmployer",
				type: "radio",
				label: "8. Would you recommend this host employer for future student placements?",
				options: recommendOptions,
				color: "brand-accent",
			},
			{
				key: "employerFeedback",
				type: "textarea",
				label: "9. Please share any positive experiences or suggestions for improvement regarding your host employer",
				placeholder: "Share your experiences and suggestions...",
				helpText:
					"Your feedback helps improve future placements for other students",
				color: "brand-accent",
			},
		],
	},
	{
		id: "step-4",
		title: "Skiltrak & Placement Process",
		description:
			"Tell us about your experience with the Skiltrak placement process and support",
		icon: <Users className="w-5 h-5" />,
		color: "brand-primary",
		fields: [
			{
				key: "skilltrakSupport",
				type: "radio",
				label: "10. How satisfied are you with the support provided by Skiltrak before and during your placement?",
				options: skillTrackSatisfactionOptions,
				color: "brand-primary",
			},
			{
				key: "skilltrakCommunication",
				type: "radio",
				label: "11. How clear was the communication from Skiltrak regarding placement expectations and requirements?",
				options: clarityOptions,
				color: "brand-primary",
			},
			{
				key: "skilltrakImprovement",
				type: "textarea",
				label: "12. Is there anything Skiltrak could do to improve the placement process for future students?",
				placeholder: "Share your suggestions for improvement...",
				helpText:
					"Your suggestions help us make the process better for everyone",
				color: "brand-primary",
			},
		],
	},
	{
		id: "step-5",
		title: "Final Comments",
		description: "Share any additional thoughts or feedback (optional)",
		icon: <CheckCircle2 className="w-5 h-5" />,
		color: "brand-secondary",
		fields: [
			{
				key: "finalComments",
				type: "textarea",
				label: "13. Any other feedback you'd like to share?",
				placeholder: "Feel free to share any additional thoughts...",
				helpText: "This section is completely optional",
				color: "brand-secondary",
			},
		],
	},
];

export default stepsConfig;

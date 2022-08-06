export const getTheme = (buttonClass: string, ButtonType: any) => {
	return {
		[ButtonType.Primary]: {
			// default: `${buttonClass} bg-primary text-white hover:bg-primary-dark border-transparent`,
			default: `${buttonClass} bg-primary text-white hover:bg-primary-dark border-transparent ring-primary-light`,
			outline: `${buttonClass} bg-transparent text-primary hover:bg-primary-dark hover:text-white border-primary-dark ring-primary-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent ring-gray-dark`,
			loading: {
				default: `white`,
				outline: `#F7910F`,
				disabled: "white",
			},
		},
		[ButtonType.Secondary]: {
			default: `${buttonClass} bg-secondary text-dark hover:bg-secondary-dark border-transparent ring-primary-light`,
			outline: `${buttonClass} bg-transparent text-dark hover:bg-secondary-dark border-secondary-dark ring-primary-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
			loading: {
				default: `black`,
				outline: `black`,
				disabled: "white",
			},
		},
		[ButtonType.Info]: {
			default: `${buttonClass} bg-info text-white hover:bg-info-light border-transparent ring-info-light`,
			outline: `${buttonClass} bg-transparent text-dark hover:bg-info-light border-info ring-info-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
			loading: {
				default: `black`,
				outline: `black`,
				disabled: "white",
			},
		},
		[ButtonType.Error]: {
			default: `${buttonClass} bg-error text-white hover:bg-error-light border-transparent ring-error-light`,
			outline: `${buttonClass} bg-transparent text-error hover:bg-error-light border-error ring-error-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
			loading: {
				default: `white`,
				outline: `red`,
				disabled: "white",
			},
		},
		[ButtonType.Action]: {
			default: `${buttonClass} bg-white text-gray-600 hover:bg-gray-200 border-transparent ring-primary-light`,
			outline: `${buttonClass} bg-white text-gray-600 hover:bg-gray-200 border-transparent ring-primary-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
			loading: {
				default: `black`,
				outline: `black`,
				disabled: "white",
			},
		},
		[ButtonType.Dark]: {
			default: `${buttonClass} bg-secondary-text text-white hover:bg-slate-600 border-transparent ring-primary-light`,
			outline: `${buttonClass} bg-transparent text-gray-600 hover:bg-slate-600 hover:text-white border-secondary-text ring-primary-light`,
			disabled: `${buttonClass} bg-gray-200 text-gray-300 border-transparent`,
			loading: {
				default: `black`,
				outline: `#2D3748`,
				disabled: "white",
			},
		},
	};
};

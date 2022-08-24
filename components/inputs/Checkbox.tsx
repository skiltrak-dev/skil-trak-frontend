import { HelpText } from "@components/HelpText";
import { RequiredStar } from "@components/RequiredStar";
import { Tooltip } from "@components/Tooltip";
import { getMethodsForInput } from "@utils";

import { useFormContext } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { InputProps } from "./InputPropType";

export type CheckboxProps = InputProps & {
	defaultChecked?: boolean;
};

export const Checkbox = ({
	id,
	name,
	label,

	defaultChecked,

	helpText,
	tooltip,

	value,
	rules,
	onChange,
	onBlur,

	loading,
	required,
	disabled,
}: CheckboxProps) => {
	const formContext = useFormContext();

	return (
		<>
			<label
				htmlFor={`id_${name}`}
				className="flex items-center gap-x-2.5 text-sm"
			>
				{!loading ? (
					<input
						{...(id ? { id } : {})}
						name={name}
						type={"checkbox"}
						disabled={disabled}
						{...getMethodsForInput(
							name,
							formContext,
							rules,
							onChange,
							onBlur
						)}
						{...(value ? { value } : {})}
						defaultChecked={defaultChecked}
					/>
				) : (
					<div className="w-[22px] h-[22px] flex items-center justify-center">
						<ClipLoader size={16} />
					</div>
				)}

				<div className="flex">
					<p className="text-sm">{label}</p>
					{required && <RequiredStar />}
				</div>

				<Tooltip text={tooltip} />
			</label>

			<HelpText text={helpText} />
		</>
	);
};

import { BaseIcon, IconProps } from "./BaseIcon";

export const IoMdArrowDropdown: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M7 10l5 5 5-5z" fill="currentColor"/>
    </BaseIcon>
  );
};


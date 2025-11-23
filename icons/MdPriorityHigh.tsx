import { BaseIcon, IconProps } from "./BaseIcon";

export const MdPriorityHigh: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <circle cx="12" cy="19" r="2" fill="currentColor"/>
      <path d="M10 3h4v12h-4z" fill="currentColor"/>
    </BaseIcon>
  );
};


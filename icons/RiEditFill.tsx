import { BaseIcon, IconProps } from "./BaseIcon";

export const RiEditFill: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M16.757 3l-1.414 1.414 3.536 3.536 1.414-1.414L16.757 3zM14.636 5.121l-9.192 9.193-1.414 4.95 4.95-1.415 9.192-9.192-3.536-3.536z" fill="currentColor"/>
    </BaseIcon>
  );
};


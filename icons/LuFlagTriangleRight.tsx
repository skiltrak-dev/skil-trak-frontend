import { BaseIcon, IconProps } from "./BaseIcon";

export const LuFlagTriangleRight: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 22V2l10 10L7 22z"/>
    </BaseIcon>
  );
};


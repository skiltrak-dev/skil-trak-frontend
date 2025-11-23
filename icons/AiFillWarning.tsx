import { BaseIcon, IconProps } from "./BaseIcon";

export const AiFillWarning: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
    </BaseIcon>
  );
};


import { BaseIcon, IconProps } from "./BaseIcon";

export const RiFootprintFill: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M4 18h2v2H4v-2zm0-4h2v2H4v-2zm0-4h2v2H4v-2zm0-4h2v2H4V6zm4 12h12v2H8v-2zm0-4h12v2H8v-2zm0-4h12v2H8v-2zm0-4h12v2H8V6z" fill="currentColor"/>
    </BaseIcon>
  );
};


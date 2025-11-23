import { BaseIcon, IconProps } from "./BaseIcon";

export const CgUnblock: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm14.707-1.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0z" fill="currentColor"/>
    </BaseIcon>
  );
};


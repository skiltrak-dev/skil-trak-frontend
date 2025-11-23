import { BaseIcon, IconProps } from "./BaseIcon";

export const RiBook2Fill: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M21 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 20c-.55 0-1-.45-1-1s.45-1 1-1h14v2H7z" fill="currentColor"/>
    </BaseIcon>
  );
};


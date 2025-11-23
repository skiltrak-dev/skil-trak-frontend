import { BaseIcon, IconProps } from "./BaseIcon";

export const CiUnlock: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M17 11h-1V8c0-2.76-2.24-5-5-5S6 5.24 6 8h2c0-1.66 1.34-3 3-3s3 1.34 3 3v3H7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm0 9H7v-7h10v7z" fill="currentColor"/>
    </BaseIcon>
  );
};


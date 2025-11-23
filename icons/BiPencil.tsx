import { BaseIcon, IconProps } from "./BaseIcon";

export const BiPencil: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M4 21h16v2H4zm4.757-17.657l-2.829 2.829 9.9 9.9 2.828-2.829-9.899-9.9zm-4.243 13.485l1.414 1.414 2.829-2.829-1.415-1.414-2.828 2.829zm14.142-12.728l-2.829-2.828c-.39-.391-1.023-.391-1.414 0l-1.414 1.414 2.828 2.829 1.415-1.415c.39-.39.39-1.023 0-1.414l-1.415-1.414 2.829-2.829c.391-.391 1.024-.391 1.414 0l2.829 2.829c.39.391.39 1.023 0 1.414l-2.829 2.829z" fill="currentColor"/>
    </BaseIcon>
  );
};


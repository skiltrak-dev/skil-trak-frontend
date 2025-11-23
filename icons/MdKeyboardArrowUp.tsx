import { BaseIcon, IconProps} from "./BaseIcon";

export const MdKeyboardArrowUp: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"}>
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="currentColor"/>
    </BaseIcon>
  );
};


import { BaseIcon, IconProps } from "./BaseIcon";

export const BsTicketDetailed: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"} viewBox="0 0 16 16">
      <path d="M13.5 1a.5.5 0 0 1 .5.5v2.382a.5.5 0 0 0 .854.354l.853-.854a.5.5 0 0 1 .707 0l.707.707a.5.5 0 0 1 0 .707l-.854.854a.5.5 0 0 0 .354.853h2.382a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2.382a.5.5 0 0 0-.354.854l.854.853a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707 0l-.854-.853a.5.5 0 0 0-.853.353V14.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h11z" fill="currentColor"/>
    </BaseIcon>
  );
};


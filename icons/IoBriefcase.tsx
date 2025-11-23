import { BaseIcon, IconProps } from "./BaseIcon";

export const IoBriefcase: React.FC<IconProps> = (props) => {
  return (
    <BaseIcon {...props} stroke={props.color || "currentColor"} viewBox="0 0 512 512">
      <path d="M336 264c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-160 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm304-120H352V80c0-26.5-21.5-48-48-48H208c-26.5 0-48 21.5-48 48v64H32c-17.7 0-32 14.3-32 32v352c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V176c0-17.7-14.3-32-32-32zM192 80c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v64H192V80zm256 400H64V176h416v304z" fill="currentColor"/>
    </BaseIcon>
  );
};


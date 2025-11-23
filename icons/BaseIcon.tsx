import React from "react";

export interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  children: React.ReactNode;
}

export type IconProps = Omit<BaseIconProps, "children">;

export const BaseIcon: React.FC<BaseIconProps> = ({
  size,
  width = "1.5em",
  height = "1.5em",
  fill = "none",
  viewBox = "0 0 24 24",
  children,
  ...rest
}) => {
  return (
    <svg
      width={size ? size : width}
      height={size ? size : height}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="img"
      {...rest}
    >
      {children}
    </svg>
  );
};

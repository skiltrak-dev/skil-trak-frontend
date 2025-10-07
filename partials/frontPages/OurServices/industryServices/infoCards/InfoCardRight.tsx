import React from "react";

interface CardProps {
  number: string;
  title: string;
  icon: React.ReactNode;
  variant?: "red" | "yellow" | "blue";
}

const bgColors = {
  red: "text-[#9A2000]",
  yellow: "text-[#F7A619]",
  blue: "text-[#044866]",
};

export const InfoCardRight: React.FC<CardProps> = ({
  number,
  title,
  icon,
  variant = "red",
}) => {
  return (
    <div className="relative w-[280px] h-[320px]">
      {/* White Card with shadow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="325"
        height="415"
        viewBox="0 0 325 415"
        fill="none"
        className="absolute inset-0"
      >
        <path
          d="M51.227 55.224C51.1021 45.7484 58.749 38 68.2255 38H282.5C291.889 38 299.5 45.6112 299.5 55V324.589C299.5 332.904 293.486 339.998 285.284 341.36L75.0214 376.26C64.7521 377.964 55.3764 370.122 55.2393 359.713L51.227 55.224Z"
          fill="white"
        />
        <path
          d="M68.2256 38.5H282.5C291.613 38.5 299 45.8873 299 55V324.589C299 332.659 293.163 339.545 285.202 340.866L74.9395 375.767C64.9723 377.421 55.8726 369.81 55.7393 359.707L51.7266 55.2178C51.6073 46.1645 58.7978 38.7357 67.7959 38.5059L68.2256 38.5Z"
          stroke="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="51"
            y1="166.5"
            x2="299"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EAEAEA" />
            <stop offset="1" stopColor={variant === "red" ? "#9B2000" : variant === "yellow" ? "#F7A619" : "#003C71"} />
          </linearGradient>
        </defs>
      </svg>

      {/* Side Accent */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="149"
        height="343"
        viewBox="0 0 149 343"
        fill="none"
        className="absolute top-4 -right-10 -z-10"
      >
        <path
          d="M4 21.5L118.99 0.411794C134.347 -2.40453 148.5 9.38864 148.5 25.0017V312.436C148.5 324.011 139.531 333.606 127.983 334.386L0.5 343L118.408 315.504C123.428 314.333 126.962 309.833 126.909 304.678L124.183 39.3151C124.082 29.4466 116.053 21.5 106.184 21.5H4Z"
          fill={variant === "red" ? "#9B2000" : variant === "yellow" ? "#F7A619" : "#003C71"}
        />
      </svg>

      {/* Card Content */}
      <div className="absolute top-16 left-20 flex flex-col items-center justify-center gap-10 p-6 text-center">
        <div className={`text-4xl ${bgColors[variant]}`}>{icon}</div>
        <p className="text-lg font-medium text-gray-800">{title}</p>
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${variant === "red" ? "bg-[#9B2000]" : variant === "yellow" ? "bg-[#F7A619]" : "bg-[#003C71]"}`}>
          {number}
        </span>
      </div>
    </div>
  );
};

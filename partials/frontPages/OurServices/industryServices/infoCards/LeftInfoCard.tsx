import React from "react";

interface LeftInfoCardProps {
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

export const LeftInfoCard: React.FC<LeftInfoCardProps> = ({
  number,
  title,
  icon,
  variant = "blue",
}) => {
  const accentColor = bgColors[variant];

  return (
    <div className="relative w-[280px] h-[320px]">
      {/* White Card */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="325"
        height="415"
        viewBox="0 0 325 415"
        fill="none"
        className="absolute inset-0"
      >
        <g filter="url(#filter0_d_left)">
          <path
            d="M273.273 55.224C273.398 45.7484 265.751 38 256.275 38H42C32.6112 38 25 45.6112 25 55V324.589C25 332.904 31.0141 339.998 39.2164 341.36L249.479 376.26C259.748 377.964 269.124 370.122 269.261 359.713L273.273 55.224Z"
            fill="white"
          />
          <path
            d="M256.274 38.5H42C32.8873 38.5 25.5 45.8873 25.5 55V324.589C25.5 332.659 31.337 339.545 39.2979 340.866L249.561 375.767C259.528 377.421 268.627 369.81 268.761 359.707L272.773 55.2178C272.893 46.1645 265.702 38.7357 256.704 38.5059L256.274 38.5Z"
            stroke={`url(#paint_left_${variant})`}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_left"
            x="0"
            y="0"
            width="324.274"
            height="414.493"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="13" />
            <feGaussianBlur stdDeviation="19" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
          <linearGradient
            id={`paint_left_${variant}`}
            x1="273.5"
            y1="166.5"
            x2="25.5"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EAEAEA" />
            <stop offset="1" stopColor={accentColor} />
          </linearGradient>
        </defs>
      </svg>

      {/* Side Accent */}
      <svg xmlns="http://www.w3.org/2000/svg" width="148" height="343" viewBox="0 0 148 343" fill="none" className="absolute top-[18px] left-2 -z-10">
        <path d="M144.5 21.5L29.5096 0.411794C14.1526 -2.40453 0 9.38864 0 25.0017V312.436C0 324.011 8.96863 333.606 20.5169 334.386L148 343L30.0919 315.504C25.0716 314.333 21.5377 309.833 21.5906 304.678L24.317 39.3151C24.4184 29.4466 32.447 21.5 42.316 21.5H144.5Z" fill={variant === "red" ? "#9B2000" : variant === "yellow" ? "#F7A619" : "#003C71"}/>
    </svg>

      {/* Card Content */}
      <div className="absolute top-16 right-0  flex flex-col items-center justify-center gap-10 p-6 text-center">
        <div className={`text-4xl ${bgColors[variant]}`}>{icon}</div>
        <p className="text-lg font-medium text-gray-800">{title}</p>
        <span className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${variant === "red" ? "bg-[#9B2000]" : variant === "yellow" ? "bg-[#F7A619]" : "bg-[#003C71]"}`}>
          {number}
        </span>
      </div>
    </div>
  );
};

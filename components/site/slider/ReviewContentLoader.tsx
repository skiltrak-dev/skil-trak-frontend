import React from "react";
import ContentLoader from "react-content-loader";

export const ReviewContentLoader = () => {
  return (
    <>
      <div
       className="
       review-card
       bg-white
       rounded-xl
       w-full
       md:h-96
       sm:overflow-hidden md:p-0
       sm:hidden
     ">
        <ContentLoader
          speed={2}
          width={350}
          height={480}
          viewBox="0 0 350 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="164" cy="72" r="64" />
          <rect x="50" y="163" rx="2" ry="2" width="224" height="27" />
          <rect x="50" y="199" rx="2" ry="2" width="143" height="18" />
          <rect x="90" y="230" rx="2" ry="2" width="143" height="14" />
          <rect x="16" y="264" rx="2" ry="2" width="280" height="18" />
          <rect x="16" y="288" rx="2" ry="2" width="280" height="18" />
          <rect x="16" y="312" rx="2" ry="2" width="280" height="18" />
          <rect x="16" y="336" rx="2" ry="2" width="280" height="18" />
          <rect x="16" y="360" rx="2" ry="2" width="240" height="18" />
        </ContentLoader>
      </div>
      <div
        className="
        review-card
        bg-white
        rounded-xl
        w-full
        md:h-96
        sm:overflow-hidden md:p-0
        hidden
      "
      >
        <ContentLoader
          speed={2}
          width={768}
          height={384}
          viewBox="0 0 768 384"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="0" ry="0" width="256" height="384" />
          <rect x="278" y="24" rx="0" ry="0" width="215" height="32" />
          <rect x="278" y="64" rx="0" ry="0" width="103" height="24" />
          <rect x="650" y="24" rx="0" ry="0" width="102" height="17" />
          <rect x="278" y="128" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="158" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="188" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="218" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="248" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="278" rx="0" ry="0" width="450" height="17" />
          <rect x="278" y="308" rx="0" ry="0" width="295" height="17" />
        </ContentLoader>
      </div>
    </>
  );
};

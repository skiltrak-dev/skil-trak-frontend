import { Typography } from "@components";
import { MdCheckCircle } from "react-icons/md";
import Lottie from "react-lottie";

type Props = {
  text: any
  onClick: any
  selected: any
  value: any
  animation: any
  vertical: any
};
export const OnBoardingLink = ({
  text,
  onClick,
  selected,
  value,
  animation,
  vertical,
}: Props) => {
  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
  };

  const iconClass = `text-3xl text-primary ${selected ? "opacity-100" : "opacity-0"
    } `;
  const checkIconClass = vertical ? `absolute top-2 right-2` : `relative`;

  return (
    <div
      onClick={() => onClick(value)}
      className={`flex ${vertical ? "flex-col relative" : "h-16"
        } items-center p-2 shadow-2 rounded-lg w-full cursor-pointer border ${selected ? "border-primary" : "border-transparent"
        }`}
    >
      <div>
        <Lottie options={animationOptions} height={90} width={90} />
      </div>
      <Typography variant={"subtitle"} color={'info'}>
        {text}
      </Typography>
      <div className={`${checkIconClass} ${iconClass}`}>
        <MdCheckCircle />
      </div>
    </div>
  );
};
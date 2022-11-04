//components
import { Card } from "@components/cards";
import { Typography } from "@components";
// image
import Image from "next/image";

type FigureCardProps = {
  imageUrl: string | undefined;
  count: number;
  title: string;
};

export const FigureCard = ({
  imageUrl,
  count,
  title,
}: FigureCardProps) => {
  console.log("imageUrl", imageUrl);
  
  return <>
    <Card>
      <div className='flex items-center gap-x-2 justify-between'>
        <Image src={imageUrl || ''} alt={title} width={50} height={50} />
        <Typography variant={"h2"}>{count}</Typography>
      </div>
      <div className='flex justify-end items-end'>
        <Typography variant={"muted"} color='text-gray-400' >{title}</Typography>
      </div>
    </Card>
  </>;
};

"use client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type InputData = {
  [key: string]: any;
};
interface IDraggableInput {
  id: string;
  data: InputData;
  Icon: any;
  text: string;
}

export const DraggableInput = ({ id, data, Icon, text }: IDraggableInput) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full"
      style={style}
      {...listeners}
      {...attributes}
    >
      {/* <span className="bg-blue-100 text-xs p-2 rounded-md border border-blue-400 text-blue-800"> */}
      <span
        className="text-xs p-2 rounded-md border"
        style={{
          backgroundColor: `${data.color}26`,
          borderColor: data.color,
          color: data.color,
        }}
      >
        <Icon />
      </span>
      <p className="text-sm">{text}</p>
    </button>
  );
};

import { IoMdClose } from "react-icons/io";
export const LabelTag = ({ tagName, handleRemoveTag, tags }: any) => {
    return (
        <div className="flex flex-wrap gap-x-1.5 gap-y-2 p-2.5 border rounded-lg">
            {tags[tagName]?.map((tag: any, index: any) => (
                <div
                    key={index}
                    className="bg-[#D4D7FF] flex flex-wrap items-center gap-x-1 pl-3 pr-2 py-2 rounded-md "
                >
                    <p className='text-xs font-medium'>{tag}</p>
                    <span
                        className="cursor-pointer"
                        onClick={() => handleRemoveTag(tagName, tag)}
                    >
                       <IoMdClose size={20} />
                    </span>
                </div>
            ))}
        </div>
    )
}

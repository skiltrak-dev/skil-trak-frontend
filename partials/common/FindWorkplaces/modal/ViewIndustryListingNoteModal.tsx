import { IoMdCloseCircle } from 'react-icons/io'
export const ViewIndustryListingNoteModal = ({ onCancel, note }: any) => {
    return (
        <>
            <div
                onClick={onCancel}
                className="flex justify-end cursor-pointer border-b p-2 mb-2"
            >
                <IoMdCloseCircle size={25} className="text-red-500" />
            </div>
            <div className="overflow-auto custom-scrollbar h-96 px-8 py-2">
                <p className="text-lg mb-2 font-semibold text-gray-500">
                    Note:
                </p>
                <p className="text-sm ">{note}</p>
            </div>
            <div className="flex justify-end cursor-pointer border-t p-4 mt-2"></div>
        </>
    )
}

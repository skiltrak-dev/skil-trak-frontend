import React from 'react'
import { FaPlus } from 'react-icons/fa6'

export const AddNewTeamCard = ({ onChangeTeamLead }: any) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md ">
            <div
                onClick={onChangeTeamLead}
                className="py-16 px-12 bg-[#F5F4FF] border-dashed border-2 rounded-md flex flex-col justify-center items-center gap-y-1.5 cursor-pointer"
            >
                <FaPlus size={30} className="text-blue-500" />

                <button className="text-blue-500 font-medium text-sm uppercase underline">
                    + add new team
                </button>
            </div>
        </div>
    )
}

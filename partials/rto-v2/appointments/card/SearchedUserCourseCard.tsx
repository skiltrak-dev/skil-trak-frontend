import React from 'react'

export const SearchedUserCourseCard = ({ selectedCourse, setSelectedCourse, course }: any) => {
    const isSelected = selectedCourse?.id === course?.id;

    const handleSelect = () => {
        if (!isSelected) setSelectedCourse(course);
    };

    return (
        <div
            className={`flex items-center gap-x-4 p-3 border rounded-lg cursor-pointer transition
            ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
            onClick={handleSelect}
        >
            <input
                type="checkbox"
                checked={isSelected}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSelect();
                }}
            />

            <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-800">{course?.title}</p>
                <p className="text-xs text-gray-500">{course?.code}</p>
            </div>
        </div>
    );
};

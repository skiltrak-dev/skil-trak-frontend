import React from 'react'

export const Input = ({ label, type, name, placeholder, id }: any) => {
    return type === 'radio' ? (
        <div
            className="mb-6 mr-4 
      flex
      items-center
      border
    px-4
    py-3
    rounded-md
    focus:outline-none
    focus:ring-1
    focus:ring-blue-900
    focus:ring-opacity-50
    shadow-lg
    w-full"
        >
            <input
                name={name}
                className=""
                type={type}
                placeholder={placeholder}
                id={`id_${id}`}
            />

            <label
                htmlFor={`id_${id}`}
                className="text-md text-gray-400 mb-1 block ml-2"
            >
                {label}
            </label>
        </div>
    ) : (
        <div className="mb-6 w-11/12 mr-4">
            <label
                htmlFor={`id_${id}`}
                className="text-md text-gray-600 mb-1 block"
            >
                {label}
            </label>
            <input
                name={name}
                className="
                  block
                  border
                  px-4
                  py-3
                  rounded-md
                  focus:outline-none
                  focus:ring-1
                  focus:ring-blue-900
                  focus:ring-opacity-50
                  shadow-lg
                  w-full
                  "
                type={type}
                placeholder={placeholder}
                id={`id_${id}`}
            />
        </div>
    )
}

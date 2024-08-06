import { Packages } from '@types'
import classNames from 'classnames'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

export const PackageItem = ({
    pkg,
    selected = false,
    onClick,
}: {
    pkg: Packages
    selected?: boolean
    onClick?: Function
}) => {
    const classes = classNames({
        'transition-all duration-300 border rounded-lg w-full px-3 py-4 cursor-pointer hover:bg-indigo-500 group relative':
            true,
        'border-gray-300': !selected,
        'border-indigo-500': selected,
    })
    return (
        <div
            className={`relative px-3 py-4 bg-white cursor-pointer ${
                selected ? 'border-t rounded-t-lg' : 'rounded-lg shadow-md border'
            }`}
            onClick={() => onClick && onClick()}
        >
            <div
                className={`transition-all duration-300 absolute top-5 right-3  ${
                    selected ? 'bg-indigo-500' : 'bg-white'
                } border shadow-sm rounded-md p-1.5`}
            >
                <IoIosArrowDown
                    className={`${
                        selected ? 'rotate-180 text-white' : 'rotate-0 text-gray-500'
                    } transition-all duration-300`}
                />
            </div>

            <p className="transition-all duration-300 text-lg text-primaryNew font-bold">
                {pkg?.name}
            </p>
            <p className="transition-all duration-300 text-sm capitalize text-primaryNew">
                {pkg?.billingType}
            </p>
        </div>
    )
}

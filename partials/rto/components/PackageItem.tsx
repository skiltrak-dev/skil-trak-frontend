import { Packages } from '@types'
import classNames from 'classnames'
import { BsFillCheckCircleFill } from 'react-icons/bs'

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
        <div className={classes} onClick={() => onClick && onClick()}>
            {selected ? (
                <div className="transition-all duration-300 absolute top-1 right-1 text-indigo-500 group-hover:text-white">
                    <BsFillCheckCircleFill />
                </div>
            ) : null}

            <p className="transition-all duration-300 text-xs text-gray-500 font-medium group-hover:text-indigo-300">
                {pkg?.name}
            </p>
            <div className="flex items-center justify-between">
                <p className="transition-all duration-300 text-sm group-hover:text-indigo-100">
                    {pkg?.name}
                </p>
                <p className="transition-all duration-300 text-xs text-gray-400 capitalize group-hover:text-indigo-900">
                    {pkg?.billingType}
                </p>
            </div>
        </div>
    )
}

import { FaTimes } from 'react-icons/fa'
import { ProfileIds } from '../types'
import { UserRoles } from '@constants'
import { Typography } from '@components'
import { IoIosArrowRoundBack } from 'react-icons/io'

interface QuickSearchToggleProps {
    quickSearch: boolean
    setQuickSearch: (value: boolean) => void
    onSectionClick: (value: ProfileIds) => void
    role: string
}

export const QuickSearchToggle: React.FC<QuickSearchToggleProps> = ({
    quickSearch,
    setQuickSearch,
    onSectionClick,
    role,
}) => {
    if (quickSearch) {
        return (
            <div
                className={`${
                    role !== UserRoles.ADMIN ? '-mr-9' : 'flex-wrap gap-x-3'
                } pl-7 shadow px-3 w-full bg-white rounded-[10px] py-2 flex items-center justify-between`}
            >
                <div
                    onClick={() => setQuickSearch(false)}
                    className="cursor-pointer"
                >
                    <FaTimes />
                </div>
                <div className="w-[1px] h-6 bg-secondary-dark" />
                {Object.entries(ProfileIds)?.map(([key, value], index) => (
                    <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                            onSectionClick(value)
                            setQuickSearch(false)
                        }}
                    >
                        <Typography medium>
                            <span className="text-[11px] block">{key}</span>
                        </Typography>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            onClick={() => setQuickSearch(true)}
            className={`${
                role !== UserRoles.ADMIN ? 'lg:-mr-4' : ''
            } flex justify-end ml-auto w-fit items-center gap-x-4 bg-white rounded-l-[10px] py-2 px-5 shadow-md cursor-pointer`}
        >
            <IoIosArrowRoundBack />
            <Typography variant="label" color="block">
                <span className="block cursor-pointer">Quick Search</span>
            </Typography>
        </div>
    )
}

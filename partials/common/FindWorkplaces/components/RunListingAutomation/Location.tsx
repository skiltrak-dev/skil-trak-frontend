import { TextInput, Typography } from '@components'
import { MdLocationOn } from 'react-icons/md'

export const Location = () => {
    return (
        <div className="w-full flex flex-col space-y-1">
            <div className="flex items-center gap-2">
                <MdLocationOn className="w-3 h-3" />
                <Typography variant="label" htmlFor="location">
                    Location
                </Typography>
            </div>
            <div className="relative w-full">
                <TextInput
                    id="location"
                    name="location"
                    placeholder="Enter address..."
                    className="w-full pl-8 h-8 text-xs"
                    placesSuggetions
                />
            </div>
        </div>
    )
}

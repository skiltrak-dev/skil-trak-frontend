import { Typography, LoadingAnimation } from '@components'

// icons
import { AiFillDelete } from 'react-icons/ai'

//query
import { useRemoveShiftMutation } from '@queries'

export const ShiftCard = ({ shift }: { shift: any }) => {
    const [removeShift, removeShiftResult] = useRemoveShiftMutation()

    const onRemove = () => {
        removeShift(shift?.id)
    }

    return (
        <div
            className={`grid ${
                removeShiftResult?.isLoading ? 'grid-cols-1' : 'grid-cols-3'
            } gap-x-1.5 bg-gray-100 rounded-md p-2 w-full`}
        >
            {removeShiftResult?.isLoading ? (
                <div className="flex items-center justify-center w-full h-5">
                    <LoadingAnimation size={25} />
                </div>
            ) : (
                <>
                    <Typography variant={'small'}>
                        {shift?.openingTime}
                    </Typography>
                    <Typography variant={'small'}>
                        {shift?.closingTime}
                    </Typography>
                    <div className="flex items-center justify-between">
                        <Typography variant={'small'}>
                            {shift?.studentCapacity}
                        </Typography>
                        <AiFillDelete
                            className="text-error cursor-pointer"
                            onClick={onRemove}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

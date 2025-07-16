import { Tooltip } from '@components'
import { useTodoHooks } from '../hooks'
import { FaCheck } from 'react-icons/fa'
import { CiSquareCheck } from 'react-icons/ci'
import moment from 'moment'
import { RxCross2 } from 'react-icons/rx'

export const CompleteTask = ({ data, text }: { data: any; text: any }) => {
    const { modal, onTodoCompleteClicked } = useTodoHooks()

    const currTimeHour = moment(new Date())
        .tz('Australia/Melbourne')
        .format('HH')
    return (
        <>
            {modal}
            {Number(currTimeHour) > 18 && data?.status === 'pending' ? (
                <div className="relative group">
                    <RxCross2 className="text-red-700" size={21} />
                    <Tooltip> Task not completed </Tooltip>
                </div>
            ) : data?.status === 'completed' ? (
                <div className="relative group">
                    <FaCheck className="text-green-600" size={19} />
                    <Tooltip> Task completed </Tooltip>
                </div>
            ) : (
                <div
                    className="cursor-pointer"
                    onClick={() => onTodoCompleteClicked(data, text)}
                >
                    <div className="relative group">
                        <CiSquareCheck className="text-green-600" size={25} />
                        <Tooltip> {text} </Tooltip>
                    </div>
                </div>
            )}
        </>
    )
}

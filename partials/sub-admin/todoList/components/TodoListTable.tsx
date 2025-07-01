import { ellipsisText } from '@utils'
import { FaCheck } from 'react-icons/fa'

export const TodoListTable = ({ students }: any) => {

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full border-collapse !bg-white">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="px-4 py-3 border-b">Name</th>
                        <th className="px-4 py-3 border-b">ID</th>
                        <th className="px-4 py-3 border-b">Action</th>
                    </tr>
                </thead>
                <tbody className="!bg-white">
                    {students?.map((student: any, idx: any) => (
                        <tr
                            key={idx}
                            className="border-b !bg-white"
                            style={{
                                backgroundColor: 'white !important',
                            }}
                        >
                            <td className="px-4 py-3 text-sm">
                                <span
                                    title={student?.title}
                                    className={
                                        student?.status === 'completed'
                                            ? 'line-through text-gray-400'
                                            : ''
                                    }
                                >
                                    {ellipsisText(student?.title, 10)}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <span
                                    className={
                                        student?.strikethrough
                                            ? 'line-through text-gray-400'
                                            : ''
                                    }
                                >
                                    {student?.id}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <FaCheck
                                    size={20}
                                    className={`${
                                        student?.status === 'completed'
                                            ? 'text-green-600'
                                            : 'text-gray-400'
                                    } text-center`}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

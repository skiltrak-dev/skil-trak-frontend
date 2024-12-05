import { Card, Typography } from '@components'

const TABLE_ROWS = [
    {
        name: 'John Michael',
        job: 'Manager',
        date: '23/04/18',
    },
    {
        name: 'Alexa Liras',
        job: 'Developer',
        date: '23/04/18',
    },
    {
        name: 'Laurent Perrier',
        job: 'Executive',
        date: '19/09/17',
    },
    {
        name: 'Michael Levi',
        job: 'Developer',
        date: '24/12/08',
    },
    {
        name: 'Richard Gran',
        job: 'Manager',
        date: '04/10/21',
    },
]

export function CancelledWorkplaceTable({ cancelledWp }: { cancelledWp: any }) {
    const TABLE_HEAD = [
        { key: 'cancelledBy', text: 'Cancelled By' },
        { key: 'createdAt', text: 'Created At' },
        { key: 'cancelledAt', text: 'Cancelled At' },
    ]
    console.log('cancelledWp', cancelledWp)
    return (
        <div className="px-4">
            <Typography medium variant="label">
                Cancelled Workplaces
            </Typography>
            <Card>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head?.key}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                                >
                                    <Typography variant="small" semibold>
                                        {head?.text}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cancelledWp.map((rowData: any, index: number) => (
                            <tr key={index} className="even:bg-blue-gray-50/50">
                                {TABLE_HEAD?.map((head: any, i: number) => (
                                    <td className="p-2" key={i}>
                                        <Typography
                                            variant="small"
                                            medium
                                            color="text-gray-500"
                                        >
                                            {rowData?.[head?.key]}
                                        </Typography>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

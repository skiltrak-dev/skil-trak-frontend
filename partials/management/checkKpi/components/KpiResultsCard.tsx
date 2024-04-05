import { Button, Typography } from '@components'
import { InfoTabCard } from './InfoTabCard'
import { LuDownload } from 'react-icons/lu'

const infoTabCardData = [
    {
        title: 'Sub-Admin',
        description: 'Haroon Aziz',
    },
    {
        title: 'Result Date',
        description: 'Nov 20, 2022  -  Nov 27, 2022',
    },
    {
        title: 'First Time Student',
        description: '124 Student',
    },
    {
        title: 'Student Duplication',
        description: '20 Student',
    },
]
export const KpiResultsCard = ({ handleTabChange, activeTab }: any) => {
    return (
        <div className="bg-white/80 rounded-md w-full">
            <div className="px-6 py-4">
                <Typography variant="label" bold color="text-primaryNew">
                    Results
                </Typography>
            </div>
            <div className="flex justify-between items-center border-t border-b px-6 py-2.5 ">
                <div className="flex items-center gap-x-4">
                    {infoTabCardData.map(({ title, description }) => (
                        <InfoTabCard title={title} description={description} />
                    ))}
                </div>
                <div>
                    <Button variant="primaryNew" text="Add New" />
                </div>
            </div>
            <div className="flex items-center justify-between p-5">
                {/* Tabs */}
                <div className="flex gap-x-10 ">
                    <div
                        className="cursor-pointer"
                        onClick={() => handleTabChange('firstTimeStudent')}
                    >
                        <Typography
                            variant="small"
                            color={
                                activeTab === 'firstTimeStudent'
                                    ? 'text-primaryNew'
                                    : 'text-gray-400'
                            }
                            bold={activeTab === 'firstTimeStudent'}
                        >
                            First Time Student
                        </Typography>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => handleTabChange('studentDuplication')}
                    >
                        <Typography
                            variant="small"
                            color={
                                activeTab === 'studentDuplication'
                                    ? 'text-primaryNew'
                                    : 'text-gray-400'
                            }
                            bold={activeTab === 'studentDuplication'}
                        >
                            Student Duplication
                        </Typography>
                    </div>
                </div>
                {/* Download Link */}
                <a href="#" className="flex items-center gap-x-1.5">
                    <LuDownload className="text-primaryNew" />
                    <div className="underline text-primaryNew">
                        <Typography variant="body" color="text-primaryNew">
                            Download Result
                        </Typography>
                    </div>
                </a>
            </div>
        </div>
    )
}

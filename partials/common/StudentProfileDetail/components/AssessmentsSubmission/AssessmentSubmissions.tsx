import { ReactElement, useState } from 'react'
import { Button, Card, Typography } from '@components'
import OutsideClickHandler from 'react-outside-click-handler'
import { IoIosArrowDown } from 'react-icons/io'
import { Student } from '@types'
import { CourseCard, SectorCard } from './Cards'
import { Courses } from './components'

export const AssessmentSubmissions = ({ student }: { student: Student }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [selectedAssessment, setSelectedAssessment] =
        useState<string>('Active')

    return (
        <>
            {modal}
            <Card noPadding fullHeight>
                <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                    <Typography variant="label" semibold>
                        Assessment Evidence
                    </Typography>
                    <div className="flex items-center gap-x-2.5">
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                setIsOpened(false)
                            }}
                        >
                            <div className="w-40 relative">
                                <div className="w-full relative cursor-pointer px-4 py-[8.5px] flex justify-evenly gap-x-2 rounded-md border border-[#128C7E] overflow-hidden">
                                    <Typography
                                        variant="small"
                                        color="text-[#128C7E]"
                                        semibold
                                        uppercase
                                    >
                                        {selectedAssessment}
                                    </Typography>

                                    <IoIosArrowDown />
                                </div>
                                <div
                                    className={`w-auto  bg-white shadow-md rounded-md z-10 absolute top-full left-0 overflow-auto custom-scrollbar transition-all duration-500 ${
                                        isOpened ? 'max-h-72' : 'max-h-0'
                                    }`}
                                >
                                    {['Active', 'Archived'].map(
                                        (type, index) => (
                                            <div
                                                className={`px-2 border-b border-gray-100 py-2 w-full cursor-pointer hover:bg-gray-100 `}
                                                key={index}
                                            >
                                                <Typography
                                                    variant="small"
                                                    medium
                                                >
                                                    {type}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </OutsideClickHandler>
                        <Button>Download All Files</Button>
                    </div>
                </div>

                <div className="">
                    <Courses student={student} />
                </div>
            </Card>
        </>
    )
}

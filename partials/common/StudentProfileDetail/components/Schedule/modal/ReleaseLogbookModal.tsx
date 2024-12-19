import Image from 'next/image'
import { MdCancel } from 'react-icons/md'
import { Button, GlobalModal, Typography } from '@components'

export const ReleaseLogbookModal = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <GlobalModal className="!max-w-5xl !w-full">
            <div className="min-w-full max-w-full mx-auto py-9 px-7 sm:px-16 md:px-32 xl:px-44 relative flex flex-col gap-y-4">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="w-full flex flex-col gap-y-2 justify-between items-center">
                    <Image
                        alt={''}
                        width={50}
                        height={50}
                        src={'/images/students/schedule.png'}
                    />
                    <div className="mx-auto">
                        <Typography center semibold>
                            Release Logbook for Student
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <div className="bg-primaryNew-dark rounded-[5px] px-6 py-5">
                        <div className="grid grid-cols-4 py-3 border-b-2 border-[#F7910F]">
                            <Typography variant="xs" color={'text-white'}>
                                RTO Name
                            </Typography>
                            <div className="border-l-2 pl-3 border-[#F7910F] col-span-3">
                                <Typography
                                    variant="xs"
                                    color={'text-white'}
                                    medium
                                >
                                    RTO Name Here
                                </Typography>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 py-3">
                            <Typography variant="xs" color={'text-white'}>
                                Course
                            </Typography>
                            <div className="border-l-2 pl-3 border-[#F7910F] col-span-3">
                                <Typography
                                    variant="xs"
                                    color={'text-white'}
                                    medium
                                >
                                    Course Here
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primaryNew-dark rounded-[5px] flex justify-between items-center px-5 py-2.5">
                        <Typography variant="small" medium color="text-white">
                            Document Tittle Here
                        </Typography>
                        <Button text="View Document" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button text="Release LOGBOOK" />
                </div>
            </div>
        </GlobalModal>
    )
}

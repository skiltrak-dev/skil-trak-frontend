import { GlobalModal, TextInput, Typography } from '@components'
import { DocumentsView, useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { GalleryFiles, StudentList } from './components'

export const RtoProfileGallery = ({ onCancel }: { onCancel: () => void }) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
    const [selectedUserId, setSelectedUserId] = useState(-1)
    const [searchValueKey, setSearchValueKey] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')

    const students =
        CommonApi.StudentAssessmentFiles.useGetAllRtoGalleryStudents(
            { id: Number(router.query?.id), search: searchValueKey },
            { refetchOnMountOrArgChange: true }
        )

    useEffect(() => {
        if (students?.data && students?.data?.length > 0) {
            setSelectedStudent(students?.data?.[0]?.id)
        }
    }, [students])

    const delayedSearch = useCallback(
        debounce((value) => setSearchValueKey(value), 700),
        []
    )

    const onSelectedStudent = useCallback((student: number) => {
        setSelectedStudent(student)
    }, [])

    return (
        <div>
            <GlobalModal>
                <div className="w-screen lg:w-[80vw] xl:w-[70vw] 2xl:w-[64vw] h-[95vh] lg:max-h-[500px] lg:min-h-[400px] overflow-hidden">
                    <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                        <div>
                            <Typography semibold>
                                <span className="text-[15px]">Gallery</span>
                            </Typography>
                        </div>
                        <FaTimes
                            onClick={onCancel}
                            className="transition-all duration-500 text-2xl cursor-pointer hover:rotate-90"
                        />
                    </div>

                    <div className="grid grid-cols-3">
                        <div className="border-r border-secondary-dark ">
                            {/*  */}
                            <div
                                className={`p-3.5 h-[inherit] border-b border-secondary-dark`}
                            >
                                <Typography variant="label" color="text-black">
                                    Search Student
                                </Typography>
                                <TextInput
                                    name={'search'}
                                    value={searchValue}
                                    placeholder={'Search Name'}
                                    onChange={(e: any) => {
                                        delayedSearch(e.target.value)
                                        setSearchValue(e.target.value)
                                    }}
                                    showError={false}
                                />
                            </div>

                            {/*  */}
                            <div className="px-4 py-5">
                                <StudentList
                                    students={students}
                                    selectedStudent={selectedStudent}
                                    onSelectedStudent={onSelectedStudent}
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="col-span-2 p-5">
                            <Typography>
                                <span className="text-[15px]">Files</span>
                            </Typography>
                            <div className="mt-3.5">
                                <GalleryFiles
                                    selectedStudent={selectedStudent}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </div>
    )
}

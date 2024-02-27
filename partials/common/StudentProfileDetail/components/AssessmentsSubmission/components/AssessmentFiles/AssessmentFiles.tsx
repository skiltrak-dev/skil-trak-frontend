import { AssessmentFolderFileCard, NoData, Typography } from '@components'
import { DocumentsView } from '@hooks'
import { SubAdminApi } from '@queries'
import { AssessmentEvidenceDetailType, Course } from '@types'
import { getCourseResult } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useRef, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { PulseLoader } from 'react-spinners'
import { AssessmentFilesUpload } from './AssessmentFilesUpload'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { SliderStyleContainer } from '../../styles'

export const AssessmentFiles = ({
    course,
    children,
    selectedFolder,
    uploadAssessment = true,
    getAssessmentResponse,
}: {
    course: Course | null
    children?: ReactNode
    getAssessmentResponse: any
    uploadAssessment?: boolean
    selectedFolder: AssessmentEvidenceDetailType | null
}) => {
    const [selected, setSelected] = useState<any>(null)
    const { onFileClicked, documentsViewModal } = DocumentsView()

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const router = useRouter()

    const result = getCourseResult(course?.results)

    const [archiveFile, archiveFileResult] =
        SubAdminApi.AssessmentEvidence.archiveUploadedFile()

    const filteredFiles = getAssessmentResponse?.data?.files?.filter(
        (file: any) => file
    )

    const deleteUploadedFileAction = (fileId: number) => {
        return (
            <div
                className="bg-white p-1 rounded-md shadow-md cursor-pointer"
                onClick={() => {
                    archiveFile(fileId)
                }}
            >
                {archiveFileResult?.isLoading &&
                archiveFileResult?.originalArgs === fileId ? (
                    <PulseLoader size={3} />
                ) : (
                    <RiDeleteBinLine className="text-red-500 text-sm" />
                )}
            </div>
        )
    }

    const containerRef = useRef(null)

    const handleWheel = (e: any) => {
        const container: any = containerRef.current
        if (container) {
            container.scrollLeft += e.deltaY
        }
    }

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'
    return (
        <div className="h-[90%]">
            {documentsViewModal}
            <div className="py-3 px-4 flex items-center justify-between border-b border-secondary-dark">
                <div>
                    <Typography variant="label" medium>
                        {selectedFolder?.name}
                    </Typography>
                    <Typography variant="xxs">
                        Uploaded 
                        {getAssessmentResponse?.data?.files?.length || 0}/
                        {selectedFolder?.capacity || 10}
                    </Typography>
                </div>
                {uploadAssessment ? (
                    <AssessmentFilesUpload
                        results={result}
                        studentId={Number(router.query?.id)}
                        selectedFolder={selectedFolder}
                    />
                ) : null}
            </div>

            <div className="h-[inherit] overflow-auto custom-scrollbar px-5 py-3">
                {getAssessmentResponse.isError && (
                    <NoData text="There is some technical issue!" />
                )}
                {filteredFiles && filteredFiles?.length > 0 ? (
                    <SliderStyleContainer className="relative">
                        <div
                            ref={containerRef}
                            // className="grid grid-cols-6 gap-1.5"
                            onWheel={handleWheel}
                        >
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={10}
                                slidesPerGroup={6}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}
                                onSwiper={(swiper: any) => {
                                    setTimeout(() => {
                                        swiper.params.navigation.prevEl =
                                            navigationPrevRef.current
                                        swiper.params.navigation.nextEl =
                                            navigationNextRef.current

                                        // Re-init navigation
                                        swiper.navigation.destroy()
                                        swiper.navigation.init()
                                        swiper.navigation.update()
                                    })
                                }}
                                modules={[Navigation]}
                                className="mySwiper static"
                            >
                                {filteredFiles?.map((file: any, i: number) => (
                                    <SwiperSlide key={file?.id}>
                                        <AssessmentFolderFileCard
                                            file={file}
                                            index={i}
                                            filename={file?.filename}
                                            fileUrl={file?.file}
                                            type={file?.type}
                                            selected={selected?.id === file?.id}
                                            onClick={onFileClicked}
                                            deleteAction={
                                                deleteUploadedFileAction
                                            }
                                        />
                                    </SwiperSlide>
                                ))}
                                <div
                                    ref={navigationPrevRef}
                                    className={`${iconClasses} left-0 lg:-left-3`}
                                >
                                    <MdKeyboardArrowLeft className="text-2xl text-white" />
                                </div>
                                <div
                                    ref={navigationNextRef}
                                    className={`${iconClasses} right-0 lg:-right-3`}
                                >
                                    <MdKeyboardArrowRight className="text-2xl text-white" />
                                </div>
                            </Swiper>
                        </div>
                    </SliderStyleContainer>
                ) : (
                    getAssessmentResponse.isSuccess && (
                        <NoData text="There is no Assessment Files!" />
                    )
                )}
                {children}
            </div>
        </div>
    )
}

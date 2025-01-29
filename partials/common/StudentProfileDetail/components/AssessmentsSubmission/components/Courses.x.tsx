import { Button, Typography } from '@components'
import { Result } from '@constants'
import {
    useGetAssessmentEvidenceDetailQuery,
    useGetAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
} from '@queries'
import { AssessmentEvidenceDetailType, Course, Sector, Student } from '@types'
import { getCourseResult } from '@utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CourseCard, SectorCard } from '../Cards'
import { SliderStyleContainer } from '../styles'
import { AssessmentsFolders } from './AssessmentsFolders'
import { FinalResult } from './FinalResult'
import { SubmitFinalResult } from './SubmitFinalResult'

export const Courses = ({
    student,
    onSetSelectedCourse,
}: {
    onSetSelectedCourse: (id: number | undefined) => void
    student: Student
}) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedFolder, setSelectedFolder] =
        useState<AssessmentEvidenceDetailType | null>(null)
    const [editAssessment, setEditAssessment] = useState<boolean>(false)
    const [manualReOpen, setManualReOpen] = useState<boolean>(false)

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const studentCourses = useStudentAssessmentCoursesQuery(
        Number(student?.id),
        {
            skip: !student?.id,
            refetchOnMountOrArgChange: true,
        }
    )
    const getFolders = useGetAssessmentEvidenceDetailQuery(
        {
            courseId: Number(selectedCourse?.id),
            studentId: Number(student?.id),
        },
        {
            skip: !selectedCourse || !student?.id,
        }
    )
    const getAssessmentResponse = useGetAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(student?.user?.id),
        },
        {
            skip: !selectedFolder || !student,
        }
    )

    useEffect(() => {
        if (
            getFolders?.data &&
            getFolders?.isSuccess &&
            getFolders?.data?.assessmentEvidence?.length > 0
        ) {
            const folder = getFolders?.data?.assessmentEvidence?.find(
                (folder: any) => folder?.id === Number(selectedFolder?.id)
            )
            onSelectFolder(
                (selectedFolder && folder
                    ? folder
                    : getFolders?.data
                          ?.assessmentEvidence?.[0]) as AssessmentEvidenceDetailType
            )
        }
    }, [getFolders])

    const getSectors = (data: any) => {
        const sectorsById: { [key: number]: Sector } = {}

        // Iterate through the data and add sectors to the object
        data?.forEach((item: Course) => {
            const sectorId = item.sector.id

            // Check if the sectorId already exists in the object
            if (!sectorsById.hasOwnProperty(sectorId)) {
                // If it doesn't exist, add the sector to the object
                sectorsById[sectorId] = item.sector
            }
        })

        // Convert the object values to an array
        const commonSectors: Sector[] = Object.values(sectorsById)

        return commonSectors
    }

    const sectors = useMemo(
        () => getSectors(studentCourses?.data),
        [studentCourses?.data]
    )

    useEffect(() => {
        if (sectors && sectors?.length > 0) {
            setSelectedSector(
                selectedSector ? selectedSector : sectors?.[0]?.id
            )
        }
    }, [sectors])

    const courses = useMemo(
        () =>
            studentCourses?.data?.filter(
                (c: any) => c?.sector?.id === selectedSector
            ),
        [studentCourses?.data, selectedSector]
    )

    useEffect(() => {
        if (courses && courses?.length > 0) {
            const course = courses?.find(
                (c: any) => c?.id === Number(selectedCourse?.id)
            )
            setSelectedCourse(selectedSector && course ? course : courses?.[0])
        }
    }, [courses, selectedSector])

    useEffect(() => {
        if (onSetSelectedCourse) {
            onSetSelectedCourse(selectedCourse?.id)
        }
    }, [selectedCourse])

    const onSelectFolder = useCallback((data: AssessmentEvidenceDetailType) => {
        setSelectedFolder(data)
    }, [])

    const isFilesUploaded =
        !getFolders.isLoading &&
        !getFolders.isFetching &&
        getFolders.isSuccess &&
        getFolders?.data?.assessmentEvidence?.every(
            (f: any) => f?.studentResponse[0]?.files?.length > 0
        )

    const files = getFolders?.data?.assessmentEvidence
        ?.map((f: any) => f?.studentResponse?.[0]?.files?.length > 0)
        ?.filter((f: any) => f)?.length

    const rejectedFolderes = getFolders?.data?.assessmentEvidence?.filter(
        (f: any) => f?.studentResponse?.[0]?.status === 'rejected'
    )?.length

    const resubmitFiles = getFolders?.data?.assessmentEvidence?.filter(
        (f: any) => f?.studentResponse?.[0]?.reSubmitted
    )?.length

    const isResubmittedFiles =
        !getFolders.isLoading &&
        !getFolders.isFetching &&
        getFolders.isSuccess &&
        rejectedFolderes === resubmitFiles &&
        Number(files) > 0

    const result = getCourseResult(selectedCourse?.results)

    const allCommentsAdded = getFolders?.data?.assessmentEvidence?.every(
        (f: any) => f?.studentResponse[0]?.comment
    )

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'

    return (
        <div>
            <div className="border-b border-secondary-dark px-4 py-2.5">
                <Typography variant="small" medium>
                    Sectors
                </Typography>
                <div className="mt-2.5 px-2 gap-2.5">
                    <SliderStyleContainer className="relative">
                        <div className="swiper-container w-full relative">
                            <Swiper
                                slidesPerView={sectors?.length > 1 ? 2 : 1}
                                spaceBetween={10}
                                slidesPerGroup={1}
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
                                {sectors?.map((sector: Sector) => (
                                    <SwiperSlide key={sector?.id}>
                                        <SectorCard
                                            onClick={() =>
                                                setSelectedSector(sector.id)
                                            }
                                            sector={sector}
                                            active={
                                                selectedSector === sector?.id
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
                </div>
            </div>

            {/*  */}
            <div className="px-4 py-4 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Courses
                </Typography>
                <div className="mt-2.5 ">
                    <SliderStyleContainer className="relative">
                        <div className="swiper-container w-full relative">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                slidesPerGroup={1}
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
                                {courses?.map((course: Course) => (
                                    <SwiperSlide key={course?.id}>
                                        <CourseCard
                                            onClick={() =>
                                                setSelectedCourse(course)
                                            }
                                            course={course}
                                            active={
                                                selectedCourse?.id ===
                                                course?.id
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
                </div>
            </div>

            <div className="border-b border-secondary-dark h-[450px] overflow-hidden">
                <div className="grid  h-[inherit]">
                    <div className="col-span py-4 border-r h-[inherit]">
                        <AssessmentsFolders
                            student={student}
                            getFolders={getFolders}
                            course={selectedCourse}
                            selectedFolder={selectedFolder}
                            onSelectFolder={onSelectFolder}
                        />
                    </div>
                    {/* <div className="col-span-4 h-[inherit]">
                        <div className="h-[84%]">
                            <AssessmentFiles
                                selectedFolder={selectedFolder}
                                course={selectedCourse}
                                getAssessmentResponse={getAssessmentResponse}
                            >
                                {getAssessmentResponse?.isSuccess ? (
                                    <InitiateSign
                                        student={student}
                                        folder={selectedFolder}
                                        courseId={selectedCourse?.id}
                                    />
                                ) : null}
                            </AssessmentFiles>
                        </div>
                        {getAssessmentResponse.isSuccess
                            ? selectedCourse?.results?.length > 0
                                ? result?.totalSubmission < 3
                                    ? (result?.result === Result.ReOpened ||
                                          result?.result === Result.ReOpened ||
                                          result?.result ===
                                              Result.NotCompetent) && (
                                          <div className="flex justify-center items-center">
                                              <SubmitAssessmentSubmission
                                                  results={
                                                      selectedCourse?.results
                                                  }
                                                  selectedCourseId={Number(
                                                      selectedCourse?.id
                                                  )}
                                                  student={student}
                                                  isFilesUploaded={
                                                      isFilesUploaded
                                                  }
                                                  isResubmittedFiles={
                                                      isResubmittedFiles
                                                  }
                                              />
                                          </div>
                                      )
                                    : !getAssessmentResponse.isLoading &&
                                      !getAssessmentResponse.isFetching &&
                                      getAssessmentResponse.isSuccess &&
                                      result?.isManualSubmission && (
                                          <div className="flex justify-center items-center">
                                              <SubmitAssessmentSubmission
                                                  results={
                                                      selectedCourse?.results
                                                  }
                                                  selectedCourseId={Number(
                                                      selectedCourse?.id
                                                  )}
                                                  student={student}
                                                  isFilesUploaded={
                                                      isFilesUploaded
                                                  }
                                                  isResubmittedFiles={
                                                      isResubmittedFiles
                                                  }
                                              />
                                          </div>
                                      )
                                : !getAssessmentResponse.isLoading &&
                                  !getAssessmentResponse.isFetching &&
                                  getAssessmentResponse.isSuccess &&
                                  selectedCourse && (
                                      <div className="flex justify-center items-center">
                                          <SubmitAssessmentSubmission
                                              results={selectedCourse?.results}
                                              selectedCourseId={Number(
                                                  selectedCourse?.id
                                              )}
                                              student={student}
                                              isFilesUploaded={isFilesUploaded}
                                              isResubmittedFiles={
                                                  isResubmittedFiles
                                              }
                                          />
                                      </div>
                                  )
                            : null}
                        {getAssessmentResponse?.isSuccess &&
                        getAssessmentResponse?.data &&
                        result?.result === Result.Pending ? (
                            <AddComment
                                resultId={result?.id}
                                studentId={student?.id}
                                comment={getAssessmentResponse?.data?.comment}
                                assessmentResponseId={
                                    getAssessmentResponse?.data?.id
                                }
                                assessmentFolder={
                                    getAssessmentResponse?.data
                                        ?.assessmentFolder
                                }
                                folderStatus={
                                    getAssessmentResponse?.data?.status
                                }
                            />
                        ) : null}
                    </div> */}
                </div>
            </div>

            {/*  */}
            <div>
                {result?.isAssessed && (
                    <div className="flex px-4 pt-2">
                        <Button
                            text={editAssessment ? 'Cancel' : 'Change Result'}
                            onClick={() => {
                                setEditAssessment(!editAssessment)
                            }}
                            variant={editAssessment ? 'primary' : 'info'}
                        />
                    </div>
                )}
                {((allCommentsAdded &&
                    ((result?.result !== Result.Competent &&
                        result?.isSubmitted) ||
                        manualReOpen)) ||
                    editAssessment) && (
                    <div className="p-4">
                        <SubmitFinalResult
                            course={selectedCourse as Course}
                            result={result}
                            setEditAssessment={() => {}}
                            studentId={student?.id}
                        />
                    </div>
                )}

                {selectedCourse &&
                    selectedCourse?.results &&
                    selectedCourse?.results?.length > 0 && (
                        <div className="px-4 pb-3">
                            <FinalResult
                                folders={getFolders}
                                results={selectedCourse?.results}
                                courseName={String(selectedCourse?.title)}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}

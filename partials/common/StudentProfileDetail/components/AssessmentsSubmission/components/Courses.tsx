import { AuthorizedUserComponent, Button, Typography } from '@components'
import { Result, UserRoles } from '@constants'
import {
    CommonApi,
    useGetAssessmentEvidenceDetailQuery,
    useGetAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
    SubAdminApi,
} from '@queries'
import {
    AssessmentEvidenceDetailType,
    Course,
    Industry,
    Sector,
    Student,
} from '@types'
import { getCourseResult } from '@utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CourseCard, SectorCard } from '../Cards'
import { SliderStyleContainer } from '../styles'
import { AssessmentFiles, InitiateSign } from './AssessmentFiles'
import { AddComment } from './AssessmentFiles/AddComment'
import { AssessmentsFolders } from './AssessmentsFolders'
import { FinalResult } from './FinalResult'
import { SubmitAssessmentSubmission } from './SubmitAssessmentSubmission'
import { SubmitFinalResult } from './SubmitFinalResult'

export const Courses = ({
    student,
    isEntered,
    onSetSelectedCourse,
}: {
    isEntered: boolean
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

    const courseNavigationPrevRef = useRef(null)
    const courseNavigationNextRef = useRef(null)

    const studentCourses = useStudentAssessmentCoursesQuery(
        Number(student?.id),
        {
            skip: !student?.id || !isEntered,
            refetchOnMountOrArgChange: 300,
        }
    )
    const studentWorkplace = SubAdminApi.Student.getWorkplaceForSchedule(
        student?.id,
        {
            skip: !student,
        }
    )

    const appliedIndustry = useMemo(
        () =>
            studentWorkplace?.data
                ?.filter(
                    (wp: any) => wp?.courses?.[0]?.id === selectedCourse?.id
                )
                ?.map((ind: any) => ind?.industries)
                ?.flat()
                ?.map((ind: any) => ind?.industry?.id)
                ?.join(','),
        [studentWorkplace, selectedCourse]
    )

    const getFolders = useGetAssessmentEvidenceDetailQuery(
        {
            courseId: Number(selectedCourse?.id),
            studentId: Number(student?.id),
            indId: appliedIndustry,
        },
        {
            skip: !selectedCourse || !student?.id || !isEntered,
            refetchOnMountOrArgChange: 60,
        }
    )
    const getAssessmentResponse = useGetAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(student?.user?.id),
        },
        {
            skip:
                !selectedFolder ||
                !student ||
                !isEntered ||
                selectedFolder?.otherDoc,
            refetchOnMountOrArgChange: 20,
        }
    )
    const getOtherDocAssessmentResponse =
        SubAdminApi.AssessmentEvidence.getOtherDocAssessment(
            {
                selectedFolder: Number(selectedFolder?.id),
                student: Number(student?.id),
            },
            {
                skip:
                    !selectedFolder ||
                    !student ||
                    !isEntered ||
                    !selectedFolder?.otherDoc,
                refetchOnMountOrArgChange: true,
            }
        )

    const eSignDocument = CommonApi.ESign.useStudentEsignDocument(
        {
            std: student?.user?.id,
            folder: Number(selectedFolder?.id),
        },
        {
            skip: !selectedFolder,
            refetchOnMountOrArgChange: 15,
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
        (f: any) =>
            f?.studentResponse?.[0]?.status === 'rejected' &&
            f?.studentResponse?.[0]?.files?.length > 0
    )?.length

    const allFiles = getFolders?.data?.assessmentEvidence
        ?.filter((f: any) => f?.studentResponse?.[0]?.status === 'rejected')
        ?.every((f: any) => f?.studentResponse?.[0]?.files?.length > 0)

    const resubmitFiles = getFolders?.data?.assessmentEvidence?.filter(
        (f: any) =>
            f?.studentResponse?.[0]?.reSubmitted &&
            f?.studentResponse?.[0]?.files?.length > 0
    )?.length

    const isResubmittedFiles: boolean = (!getFolders.isLoading &&
        !getFolders.isFetching &&
        getFolders.isSuccess &&
        rejectedFolderes &&
        allFiles &&
        resubmitFiles &&
        rejectedFolderes === resubmitFiles &&
        Number(files) > 0) as boolean

    const result = getCourseResult(selectedCourse?.results)

    const allCommentsAdded = getFolders?.data?.assessmentEvidence?.every(
        (f: any) => f?.studentResponse[0]?.comment
    )

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="border-r border-secondary-dark px-4 py-2.5">
                    <Typography variant="small" medium>
                        Sectors
                    </Typography>
                    <div className="mt-2.5 px-2 gap-2.5">
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
                                    onSlideChange={(e: any) => {
                                        if (sectors && sectors?.length > 0) {
                                            setSelectedSector(
                                                sectors?.[e?.activeIndex]?.id
                                            )
                                            if (
                                                courses &&
                                                courses?.length > 0
                                            ) {
                                                setSelectedCourse(courses?.[0])
                                            }
                                        }
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
                                                    selectedSector ===
                                                    sector?.id
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
                <div className="lg:col-span-2 px-4 py-2.5">
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
                                        prevEl: courseNavigationPrevRef.current,
                                        nextEl: courseNavigationNextRef.current,
                                    }}
                                    onSlideChange={(e: any) => {
                                        if (courses && courses?.length > 0) {
                                            setSelectedCourse(
                                                courses?.[e?.activeIndex]
                                            )
                                        }
                                    }}
                                    onSwiper={(swiper: any) => {
                                        setTimeout(() => {
                                            swiper.params.navigation.prevEl =
                                                courseNavigationPrevRef.current
                                            swiper.params.navigation.nextEl =
                                                courseNavigationNextRef.current

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
                                        ref={courseNavigationPrevRef}
                                        className={`${iconClasses} left-0 lg:-left-3`}
                                    >
                                        <MdKeyboardArrowLeft className="text-2xl text-white" />
                                    </div>
                                    <div
                                        ref={courseNavigationNextRef}
                                        className={`${iconClasses} right-0 lg:-right-3`}
                                    >
                                        <MdKeyboardArrowRight className="text-2xl text-white" />
                                    </div>
                                </Swiper>
                            </div>
                        </SliderStyleContainer>
                    </div>
                </div>
            </div>

            {/*  */}

            <div
                className={`border-y border-secondary-dark h-auto ${
                    eSignDocument?.data && eSignDocument?.data?.length > 0
                        ? 'lg:h-[520px]'
                        : 'lg:h-[400px]'
                } overflow-hidden`}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 h-[inherit]">
                    <div className="py-4 border-r h-[inherit]">
                        <div className="h-[calc(100%-38px)]">
                            <AssessmentsFolders
                                student={student}
                                getFolders={{
                                    ...getFolders,
                                    data:
                                        getFolders?.data?.assessmentEvidence ||
                                        getFolders?.data,
                                }}
                                otherDocs={
                                    getFolders?.data?.otherDocs?.map(
                                        (othDoc) => ({
                                            ...othDoc,
                                            otherDoc: true,
                                        })
                                    ) || []
                                }
                                course={selectedCourse}
                                selectedFolder={selectedFolder}
                                onSelectFolder={onSelectFolder}
                            />
                        </div>
                        {getAssessmentResponse.isSuccess
                            ? selectedCourse?.results?.length > 0
                                ? result?.totalSubmission < 3
                                    ? (result?.result === Result.ReOpened ||
                                          result?.result === Result.ReOpened ||
                                          result?.result ===
                                              Result.NotCompetent) && (
                                          <div className="flex justify-center items-center mt-2">
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
                                          <div className="flex justify-center items-center mt-2">
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
                                      <div className="flex justify-center items-center mt-2">
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
                    </div>
                    <div className="lg:col-span-2 h-[inherit]">
                        <div className="h-auto lg:h-[85%]">
                            <AssessmentFiles
                                selectedFolder={selectedFolder}
                                course={selectedCourse}
                                getAssessmentResponse={
                                    selectedFolder?.otherDoc
                                        ? getOtherDocAssessmentResponse
                                        : getAssessmentResponse
                                }
                            >
                                {getAssessmentResponse?.isSuccess ? (
                                    <InitiateSign
                                        student={student}
                                        folder={selectedFolder}
                                        courseId={selectedCourse?.id}
                                        eSignDocument={eSignDocument}
                                    />
                                ) : null}
                            </AssessmentFiles>
                        </div>
                        <AuthorizedUserComponent
                            excludeRoles={[UserRoles.OBSERVER]}
                        >
                            {getAssessmentResponse?.isSuccess &&
                            getAssessmentResponse?.data &&
                            (result?.result === Result.Pending ||
                                result?.result === Result.NotCompetent ||
                                result?.result === Result.ReOpened) ? (
                                <AddComment
                                    resultId={result?.id}
                                    studentId={student?.id}
                                    comment={
                                        getAssessmentResponse?.data?.comment
                                    }
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
                        </AuthorizedUserComponent>
                    </div>
                </div>
            </div>

            {/*  */}
            <div>
                <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                    {result?.isAssessed && (
                        <div className="flex px-4 pt-2">
                            <Button
                                text={
                                    editAssessment ? 'Cancel' : 'Change Result'
                                }
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
                </AuthorizedUserComponent>
                {selectedCourse &&
                    selectedCourse?.results &&
                    selectedCourse?.results?.length > 0 && (
                        <div className="px-4 pb-3">
                            <FinalResult
                                folders={{
                                    ...getFolders,
                                    data:
                                        getFolders?.data?.assessmentEvidence ||
                                        getFolders?.data,
                                }}
                                results={selectedCourse?.results}
                                courseName={String(selectedCourse?.title)}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}

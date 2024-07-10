import { Button, Typography } from '@components'
import { Result } from '@constants'
import {
    CourseCard,
    SectorCard,
} from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/Cards'
import { AssessmentFiles } from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/components/AssessmentFiles'
import { AssessmentsFolders } from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/components/AssessmentsFolders'
import { FinalResult } from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/components/FinalResult'
import { SliderStyleContainer } from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/styles'
import {
    IndustryApi,
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

export const StudentAssessmentsCourses = ({ profile }: { profile: any }) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedFolder, setSelectedFolder] =
        useState<AssessmentEvidenceDetailType | null>(null)

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const courseNavigationPrevRef = useRef(null)
    const courseNavigationNextRef = useRef(null)

    const studentCourses = profile?.courses

    const getFolders = IndustryApi.Workplace.useAssessmentFolders(
        {
            courseId: Number(selectedCourse?.id),
            studentId: Number(profile?.student?.id),
        },
        {
            skip: !selectedCourse,
        }
    )

    const getAssessmentResponse = IndustryApi.Workplace.useFoldersResponse(
        {
            selectedFolderId: Number(selectedFolder?.id),
            studentId: Number(profile?.student?.user?.id),
        },
        { skip: !selectedFolder || !profile?.student?.user?.id }
    )

    useEffect(() => {
        if (
            getFolders?.data &&
            getFolders?.isSuccess &&
            getFolders?.data?.length > 0
        ) {
            const folder = getFolders?.data?.find(
                (folder: any) => folder?.id === Number(selectedFolder?.id)
            )
            onSelectFolder(
                (selectedFolder && folder
                    ? folder
                    : getFolders?.data?.[0]) as AssessmentEvidenceDetailType
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

    const sectors = useMemo(() => getSectors(studentCourses), [studentCourses])

    useEffect(() => {
        if (sectors && sectors?.length > 0) {
            setSelectedSector(
                selectedSector ? selectedSector : sectors?.[0]?.id
            )
        }
    }, [sectors])

    const courses = useMemo(
        () =>
            studentCourses?.filter(
                (c: any) => c?.sector?.id === selectedSector
            ),
        [studentCourses, selectedSector]
    )

    useEffect(() => {
        if (courses && courses?.length > 0) {
            const course = courses?.find(
                (c: any) => c?.id === Number(selectedCourse?.id)
            )
            setSelectedCourse(selectedSector && course ? course : courses?.[0])
        }
    }, [courses, selectedSector])

    const onSelectFolder = useCallback((data: AssessmentEvidenceDetailType) => {
        setSelectedFolder(data)
    }, [])

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'

    return (
        <div>
            <div className="grid grid-cols-3">
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
                <div className="col-span-2 px-4 py-2.5">
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

            <div className="border-y border-secondary-dark h-[280px] overflow-hidden">
                <div className="grid grid-cols-3 h-[inherit]">
                    <div className="py-4 border-r h-[inherit]">
                        <AssessmentsFolders
                            student={profile?.student}
                            getFolders={getFolders}
                            course={selectedCourse}
                            selectedFolder={selectedFolder}
                            onSelectFolder={onSelectFolder}
                        />
                    </div>
                    <div className="col-span-2 h-[inherit]">
                        <div className="h-[84%]">
                            <AssessmentFiles
                                selectedFolder={selectedFolder}
                                course={selectedCourse}
                                getAssessmentResponse={getAssessmentResponse}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <div>
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

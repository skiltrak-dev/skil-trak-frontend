import { ContextBarLoading, NoData, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Course, Rto, Student } from '@types'
import { useEffect } from 'react'
import { AssignedCourse } from '../components'
import { AssignSectorForm } from '../form'

const getSectors = (courses: any) => {
   if (!courses) return {}
   const sectors = {}
   courses.forEach((c: any) => {
      if ((sectors as any)[c.sector.name]) {
         ;(sectors as any)[c.sector.name].push(c)
      } else {
         ;(sectors as any)[c.sector.name] = []
         ;(sectors as any)[c.sector.name].push(c)
      }
   })
   return sectors
}

export const ViewSectorsCB = ({ student }: { student: Student }) => {
   const { notification } = useNotification()
   const courses = AdminApi.Students.useSectors(student.id)
   const sectorsWithCourses = getSectors(courses.data)

   const [assignCourses, assignCoursesResult] =
      AdminApi.Students.useAssignCourses()
   const onSubmit = async (values: any) => {
      const { courses } = values
      await assignCourses({
         user: student.id,
         courses: courses.map((c: any) => c.value),
      })
   }

   const [unassignCourse, unassignCourseResult] =
      AdminApi.Students.useUnassignCourses()
   const onCourseRemove = async (course: Course) => {
      await unassignCourse({
         id: student.id,
         courseId: course.id,
      })
   }

   useEffect(() => {
      if (assignCoursesResult.isSuccess) {
         notification.success({
            title: 'Courses Assigned',
            description: 'Courses have been assigned to Student',
         })
      }

      if (assignCoursesResult.isError) {
         notification.error({
            title: 'Courses Assignment Failed',
            description: 'An error occurred while assigning course(s)',
         })
      }
   }, [assignCoursesResult])

   useEffect(() => {
      if (unassignCourseResult.isSuccess) {
         notification.info({
            title: 'Courses Unassigned',
            description: 'Courses have been unassigned to RTO',
         })
      }

      if (unassignCourseResult.isError) {
         notification.error({
            title: 'Failed To Unassign',
            description: 'An error occurred while unassign course(s)',
         })
      }
   }, [unassignCourseResult])

   return (
      <div className="flex flex-col gap-y-6">
         <div>
            <Typography variant={'muted'} color={'text-gray-400'}>
               Sectors &amp; Courses Of:
            </Typography>
            <Typography variant={'label'}>{student.user.name}</Typography>
         </div>

         <AssignSectorForm onSubmit={onSubmit} />

         <div className={'flex flex-col gap-y-2'}>
            <Typography variant={'muted'} color={'text-gray-400'}>
               Selected Sectors &amp; Courses
            </Typography>

            {courses.isLoading ? (
               <ContextBarLoading />
            ) : courses.data?.length ? (
               Object.keys(sectorsWithCourses).map((sector) => {
                  return (
                     <>
                        <span
                           key={sector}
                           className="text-xs font-medium text-slate-400 border-t pt-2"
                        >
                           {sector}
                        </span>

                        {(sectorsWithCourses as any)[sector].map(
                           (c: Course) => (
                              <AssignedCourse
                                 key={c.id}
                                 course={c}
                                 onRemove={onCourseRemove}
                              />
                           )
                        )}
                     </>
                  )
               })
            ) : (
               <NoData text={'No Courses Assigned'} />
            )}
         </div>
      </div>
   )
}

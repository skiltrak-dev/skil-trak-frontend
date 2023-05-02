// moment
import { Typography } from '@components/Typography'
import moment from 'moment'
// icons
import { AiFillEdit } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'
import { BsUnlockFill } from 'react-icons/bs'
import { FaAddressCard, FaBirthdayCake, FaUserCircle } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdBatchPrediction, MdPhone, MdVerified } from 'react-icons/md'

// hooks
import { useActionModal, useNotification } from '@hooks'

// queries
import { StudentAvatar } from '@components/avatars'
import { BlockModal } from '@partials/sub-admin/students/modals'
import { Student } from '@types'
import { ellipsisText, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StudentStatus } from './StudentStatus'
import { ActionButton } from '@components/buttons'
import { UserCreatedAt } from '@components/UserCreatedAt'
import { SubAdminApi } from '@queries'

const getGender = (gender: string | undefined) => {
    if (!gender) return 'N/A'

    if (gender.toLocaleLowerCase() === 'm') return 'Male'
    if (gender.toLocaleLowerCase() === 'f') return 'Female'
}
export const SubAdminStudentProfile = ({ student }: { student: any }) => {
    const router = useRouter()
    const { notification } = useNotification()
    const { passwordModal, onUpdatePassword } = useActionModal()
    const [calledStudent, resultCalledStudent] = SubAdminApi.Student.useCalled()

    const role = getUserCredentials()?.role

    useEffect(() => {
        if (resultCalledStudent.isSuccess) {
            notification.success({
                title: 'Called Student',
                description: `Called Student with Id: ${student.studentId}`,
            })
        }
    }, [resultCalledStudent])

    return (
        <div>
            {passwordModal && passwordModal}
            <div className="relative flex flex-col items-center">
                <div className="flex items-center gap-x-2 absolute top-0 right-0">
                    <ActionButton
                        rounded
                        Icon={AiFillEdit}
                        variant={'info'}
                        onClick={() =>
                            router.push(
                                role === 'admin'
                                    ? `/portals/admin/student/edit-student/${student?.id}`
                                    : role === 'subadmin'
                                    ? `/portals/sub-admin/students/${student?.id}/edit-student`
                                    : role === 'rto'
                                    ? `/portals/rto/students/${student?.id}/edit-student`
                                    : ''
                            )
                        }
                        title="Edit Profile"
                    />

                    <ActionButton
                        rounded
                        Icon={BsUnlockFill}
                        variant={'neutral'}
                        onClick={() => onUpdatePassword(student)}
                        title="Edit Password"
                    />
                </div>
                <StudentAvatar
                    name={student?.user.name}
                    imageUrl={student?.user?.avatar}
                    gender={student?.gender}
                />

                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">
                        {student?.user?.name}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm text-gray-400">
                            {ellipsisText(student?.user?.email, 30)}
                        </p>
                        <span className="text-blue-500">
                            <MdVerified />
                        </span>
                    </div>
                </div>
            </div>

            {/* Info Row 1 */}
            <div className="flex justify-between divide-x border-b mt-4">
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <FaAddressCard size={12} />
                        </span>
                        <p className="text-xs font-medium">
                            {student?.studentId}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-right">
                        Student ID
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <MdBatchPrediction size={12} />
                        </span>
                        <p className="text-xs font-medium">N/A</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-right">
                        Batch
                    </div>
                </div>
            </div>
            <div className="p-2 border-b">
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center gap-x-2">
                        <span className="text-gray-300">
                            <MdPhone size={12} />
                        </span>
                        <p className="text-xs font-medium">{student?.phone}</p>
                    </div>
                    <div>
                        {student?.called ? (
                            <div className="bg-green-200  rounded-md px-4 py-1">
                                <MdPhone className="text-white" size={15} />
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    calledStudent(student.id)
                                }}
                                className="bg-green-400 hover:bg-green-500 rounded-md px-4 py-1 cursor-pointer"
                            >
                                <MdPhone className="text-white" size={15} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-gray-400 text-[11px] flex justify-start pl-4 -mt-0.5 text-right">
                        Phone Number
                    </div>
                    <div className="text-gray-400 text-[11px] flex justify-center mt-2 text-center">
                        Call student
                    </div>
                </div>
            </div>
            <div className="border-b">
                <UserCreatedAt label createdAt={student?.createdAt} />
            </div>
            {/* Info Row 2 */}
            <div className="flex justify-around divide-x border-b">
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <FaBirthdayCake size={12} />
                        </span>
                        <p className="text-xs font-medium">
                            {student?.dob
                                ? moment(student?.dob).format('DD MMM, YYYY')
                                : 'Not Provided'}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-right">
                        Date Of Birth
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <FaUserCircle size={12} />
                        </span>
                        <p className="text-xs font-medium">
                            {getGender(student?.gender)}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-right">
                        Gender
                    </div>
                </div>
            </div>

            {/* Info Row 3 */}
            <div className="flex justify-around">
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <IoLocation size={12} />
                        </span>
                        {/* <div className="text-gray-400 text-[11px] -mt-0.5 text-right">
                            Address
                        </div> */}
                        <div>
                            <p className="text-xs font-medium">
                                {student?.addressLine1}, {student?.state},{' '}
                                {student?.suburb}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* contact person row 4 */}
            <div className="mt-4">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Emergency Contact Person
                </Typography>
                <div className="flex justify-around divide-x border-t border-b">
                    <div className="p-2">
                        <div className="flex items-center gap-x-2">
                            <BiRename className="text-gray-400" size={12} />
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Name
                            </Typography>
                        </div>
                        <Typography variant={'small'} color={'text-black'}>
                            {student?.emergencyPerson}
                        </Typography>
                    </div>
                    <div className="p-2">
                        <div className="flex items-center gap-x-2">
                            <MdPhone className="text-gray-400" size={12} />
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Phone
                            </Typography>
                        </div>
                        <div className="py-1">
                            <Typography variant={'small'} color={'text-black'}>
                                {student?.emergencyPersonPhone}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Of Student */}
            <StudentStatus
                id={student?.user?.id}
                currentStatus={student?.studentStatus}
            />

            {/* Sector & Courses */}
            {/* <div className="mt-4">
        <Typography variant={'small'} color={'text-gray-500'}>
          Sector & Courses
        </Typography>
        <Typography variant={'label'} color={'text-black'}>
          Commercial Cookery & Hospitality
        </Typography>
        <div className="mt-2 flex items-center gap-x-2">
          <div className="flex flex-col items-center">
            <div className="bg-blue-400 p-2 rounded-full"></div>
            <div className="bg-blue-400 w-[1px] h-10"></div>
            <div className="bg-blue-400 p-2 rounded-full"></div>
            <div className="bg-blue-400 w-[1px] h-10"></div>
            <div className="bg-blue-400 p-2 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-y-4">
            {studentProfileData.map((course: any) => (
              <div key={course.id}>
                <div className="flex items-center gap-x-2">
                  <Typography variant={'small'} color={'text-gray-500'}>
                    {course.courseCode}
                  </Typography>
                  <div
                    className={`rounded whitespace-nowrap border px-2 ${
                      course.status === 'Not Active'
                        ? 'border-gray-400'
                        : 'border-green-400'
                    }`}
                  >
                    <Typography
                      variant={'small'}
                      color={
                        course.status === 'Not Active'
                          ? 'text-gray-500'
                          : 'text-green-500'
                      }
                    >
                      {course.status}
                    </Typography>
                  </div>
                  {course.status === 'Active' ? (
                    <div
                      className={`rounded whitespace-nowrap text-center border px-2 ${
                        data?.result?.result === 'competent'
                          ? 'bg-green-600'
                          : data?.result?.result === 'notCompetent'
                          ? 'bg-red-500'
                          : null
                      }`}
                    >
                      <Typography variant={'small'} color={'text-white'}>
                        {checkStatus(data?.result?.result)}
                      </Typography>
                    </div>
                  ) : course.status === 'Completed' ? (
                    <div
                      className={`rounded whitespace-nowrap text-center border px-2 ${
                        data?.result?.result === 'competent'
                          ? 'bg-green-600'
                          : data?.result?.result === 'notCompetent'
                          ? 'bg-red-500'
                          : null
                      }`}
                    >
                      <Typography variant={'small'} color={'text-white'}>
                        {checkStatus(data?.result?.result)}
                      </Typography>
                    </div>
                  ) : null}
                </div>
                <Typography variant={'small'} color={'text-gray-800'}>
                  {course.courseName}
                </Typography>
              </div>
            ))}

           
          </div>
        </div>
      </div> */}
        </div>
    )
}

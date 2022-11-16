import Image from 'next/image'
// moment
import moment from 'moment'
import {
  InitialAvatar,
  InitialAvatarContainer,
} from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'
// icons
import { AiFillEdit } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'
import { IoLocation } from 'react-icons/io5'
import { GiBackwardTime } from 'react-icons/gi'
import { FaAddressCard, FaBirthdayCake, FaPhoneAlt, FaUserCircle } from 'react-icons/fa'
import { MdBatchPrediction, MdBlock, MdPhone, MdVerified } from 'react-icons/md'
// queries

type Props = {
  data: any
}

export const SubAdminStudentProfile = ({
  data,
}: Props) => {
  
  const checkStatus = (status: any) => {
    switch (status) {
      case 'notCompetent':
        return 'Not Competent'
      case 'competent':
        return 'Competent'
    }
  }
    const studentProfileData = [
      {
        courseCode: 'SITHCCC020',
        courseName: 'Work Effectively As Cook',
        status: 'Completed',
        assessment: 'Competent',
      },
      {
        courseCode: 'SITHCCC020',
        courseName: 'Coordinate Cooking Operations',
        status: 'Active',
        assessment: 'Not Competent',
      },
      {
        courseCode: 'SITHCCC020',
        courseName: 'Work Effectively In Hospitality Service',
        status: 'Not Active',
        assessment: 'Not Competent',
      },
    ]
    return (
      <div>
        <div className="flex justify-end gap-x-2">
          <div className="bg-blue-100 rounded-full p-1">
            <AiFillEdit className="text-blue-400  cursor-pointer " />
          </div>
          <div className="bg-red-100 rounded-full p-1">
            <MdBlock className="text-red-400  cursor-pointer bg-red-100 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1615915468538-0fbd857888ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9zYSUyMGh1dCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              width={100}
              height={100}
              className="rounded-full shadow-inner-image"
            />
            <div className="absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image"></div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold">{data?.user?.name}</p>
            <div className="flex items-center gap-x-2">
              <p className="text-sm text-gray-400">
                {data?.user?.email}
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
                <FaAddressCard />
              </span>
              <p className="text-sm font-medium">{data?.studentId}</p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Student ID
            </div>
          </div>

          <div className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                <MdBatchPrediction />
              </span>
              <p className="text-sm font-medium">April 22</p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Batch
            </div>
          </div>

          <div className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                <MdPhone />
              </span>
              <p className="text-sm font-medium">{data?.phone}</p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Phone Number
            </div>
          </div>
        </div>
        {/* Info Row 2 */}
        <div className="flex justify-around divide-x border-b">
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                <FaBirthdayCake />
              </span>
              <p className="text-sm font-medium">{moment(data?.dob).format('LL')}</p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Date Of Birth
            </div>
          </div>

          <div className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                <FaUserCircle />
              </span>
              <p className="text-sm font-medium">Male</p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Gender
            </div>
          </div>
        </div>

        {/* Info Row 3 */}
        <div className="flex justify-around">
          <div className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">
                <IoLocation />
              </span>
              <p className="text-sm font-medium">
                {data?.addressLine1}, {data?.addressLine2}, {data?.state}, {data?.suburb}
              </p>
            </div>
            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
              Address
            </div>
          </div>
        </div>
        {/* contact person row 4 */}
        <Typography variant={'small'} color={'text-gray-500'}>
          Emergency Contact Person
        </Typography>
        <div className="flex justify-around divide-x border-t border-b">
          <div className="p-2">
            <div className="flex items-center gap-x-2">
              <BiRename className="text-gray-400" />
              <Typography variant={'small'} color={'text-gray-400'}>
                Name
              </Typography>
            </div>
            <Typography variant={'small'} color={'text-black'}>
              {data?.emergencyPerson}
            </Typography>
          </div>
          <div className='p-2'>
            <div className="flex items-center gap-x-2">
              <FaPhoneAlt className="text-gray-400" />
              <Typography variant={'small'} color={'text-gray-400'}>
                Phone
              </Typography>
            </div>
            <div className='py-1'>
              <Typography variant={'small'} color={'text-black'}>
                {data?.emergencyPersonPhone}
              </Typography>
            </div>
          </div>
        </div>

        {/* Sector & Courses */}
        <div className="mt-4">
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
              {studentProfileData.map((course) => (
                <div className="">
                  <div className="flex items-center gap-x-2">
                    <Typography
                      variant={'small'}
                      color={'text-gray-500'}
                    >
                      {course.courseCode}
                    </Typography>
                    <div
                      className={`rounded whitespace-nowrap border px-2 ${course.status === 'Not Active'
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
                        className={`rounded whitespace-nowrap text-center border px-2 ${data?.result?.result === 'competent'
                          ? 'bg-green-600'
                          : data?.result?.result ===
                            'notCompetent'
                            ? 'bg-red-500'
                            : null
                          }`}
                      >
                        <Typography
                          variant={'small'}
                          color={'text-white'}
                        >
                          {checkStatus(data?.result?.result)}
                        </Typography>
                      </div>
                    ) : course.status === 'Completed' ? (
                      <div
                        className={`rounded whitespace-nowrap text-center border px-2 ${data?.result?.result === 'competent'
                          ? 'bg-green-600'
                          : data?.result?.result ===
                            'notCompetent'
                            ? 'bg-red-500'
                            : null
                          }`}
                      >
                        <Typography
                          variant={'small'}
                          color={'text-white'}
                        >
                          {checkStatus(data?.result?.result)}
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                  <Typography
                    variant={'small'}
                    color={'text-gray-800'}
                  >
                    {course.courseName}
                  </Typography>
                </div>
              ))}

              {/* <div>
              <div className='flex items-center gap-x-2'>
                <Typography
                  variant={'small'}
                  color={'text-gray-500'}
                >
                  SITHKOP005
                </Typography>
                <div className='rounded border px-2 border-green-400'>
                  <Typography variant={'small'} color={'text-green-500'}>
                    ACTIVE
                  </Typography>
                </div>
                <div className='rounded text-center border px-2 bg-red-500'>
                  <Typography variant={'small'} color={'text-white'}>
                    NOT COMPETENT
                  </Typography>
                </div>
              </div>
              <Typography
                variant={'small'}
                color={'text-gray-800'}
              >
                Coordinate Cooking Operations
              </Typography>
            </div>
            <div >
              <div className="flex items-center gap-x-2">
                <Typography
                  variant={'small'}
                  color={'text-gray-500'}
                >
                  SITHIND004
                </Typography>
                <div className='rounded border px-2 border-gray-400'>
                  <Typography variant={'small'} color={'text-gray-500'}>
                    NOT ACTIVE
                  </Typography>
                </div>
              </div>
              <Typography
                variant={'small'}
                color={'text-gray-800'}
              >
                Work Effectively In Hospitality Service
              </Typography>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

import Image from 'next/image'
import Link from 'next/link'
// components
import { InitialAvatar, InitialAvatarContainer } from '@components/InitialAvatar'
import { Card } from '@components/cards'
// path
import { useRouter } from 'next/router'
// icons
import { FaSchool } from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'
// queries
import { useGetSubAdminMyRtoQuery } from '@queries'

type Props = {}

export const MyRtoInfoCard = (props: Props) => {
  const pathname = useRouter()
  const profileId = pathname.query.profileId;
  const { data }: any = useGetSubAdminMyRtoQuery(String(profileId))
  console.log("useGetSubAdminMyRtoQuery", data);
  return (
    <div className='w-full'>
      <Card>
        {/* Card Header */}
        <div className="flex justify-between items-center">
          {/* Icon Title */}
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex justify-center items-center">
              <FaSchool size={16} />
            </div>
            <p className="text-sm font-semibold">My RTO</p>
          </div>

          {/* Action */}
          <Link href="#">
            <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
              See Details
            </a>
          </Link>
        </div>

        {/* Card Body */}
        <div className="flex items-center gap-x-6 py-4">
          <div className="flex-shrink-0">
            <Image src="/#" height={100} width={100} />
          </div>
          <div>
            <div>
              <p className="font-medium">
                {data?.rto?.user?.name}
              </p>
              <p className="text-slate-400 text-sm">
                {data?.rto?.user?.email}
              </p>
            </div>
            <div className="flex gap-x-6 mt-1">
              <div className="flex items-center gap-x-2">
                <span className="text-gray-400">
                  <MdPermContactCalendar size={14} />
                </span>
                <span className="text-xs">John Smith</span>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-400">
                  <MdPhone size={14} />
                </span>
                <span className="text-xs">039 6534 100</span>
              </div>
            </div>

            {data?.rto?.subadmin.map((coordinator:any) => (
              <div className="mt-4">
                <p className="text-[11px] text-gray-400">
                  Coordinators
                </p>
                <div className="flex justify-between gap-x-4">
                  <div>
                    <p className="font-medium text-sm">
                      {coordinator?.user?.name}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      {coordinator?.user?.email}
                    </p>
                  </div>

                  <InitialAvatarContainer show={2}>
                    <InitialAvatar name="John Smith" first />
                    <InitialAvatar name="Yaseen Khan" />
                    <InitialAvatar name="Julie Clarke" />
                    <InitialAvatar name="Salman" />
                  </InitialAvatarContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

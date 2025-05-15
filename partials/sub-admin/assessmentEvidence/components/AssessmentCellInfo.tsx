import { InitialAvatar } from '@components'
import { useSubadminProfile } from '@hooks'
import { getUserCredentials, setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const AssessmentCellInfo = ({ item }: { item: any }) => {
    const router = useRouter()
    const subadminId = getUserCredentials()?.id

    const subadmin = useSubadminProfile()

    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                {item?.student?.user?.name && (
                    <div>
                        <InitialAvatar
                            name={item?.student?.user?.name}
                            imageUrl={item?.student?.user?.avatar}
                        />
                    </div>
                )}

                <Link
                    legacyBehavior
                    href={
                        item?.student?.subadmin?.user?.id === subadminId ||
                        subadmin?.isManager ||
                        subadmin?.departmentMember?.isHod
                            ? {
                                  pathname: `/portals/sub-admin/students/${item?.student?.id}/detail`,
                                  query: {
                                      tab: 'submissions',
                                      course: item?.course?.id,
                                  },
                              }
                            : '#'
                    }
                >
                    <a
                        onClick={() => {
                            setLink('subadmin-student', router)
                        }}
                    >
                        <p className="text-gray-800 font-medium">
                            {item?.student?.user?.name}
                        </p>
                    </a>
                </Link>
            </div>
        </div>
    )
}

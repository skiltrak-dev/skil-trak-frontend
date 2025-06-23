import { ActionButton, Typography } from '@components'
import { useContextBar, useSubadminProfile } from '@hooks'
import { Course, Rto, Student } from '@types'
import { ViewSectorsCB } from '../contextBar'
import { CourseDot } from './CourseDot'
import { useEffect } from 'react'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const SectorCell = ({
    student,
    hideButton,
}: {
    hideButton?: boolean
    student: Student
}) => {
    const contextBar = useContextBar()

    const subadmin = useSubadminProfile()

    const role = getUserCredentials()?.role

    useEffect(() => {
        return () => {
            if (contextBar.content) {
                contextBar.setTitle('')
                contextBar.setContent(null)
                contextBar.hide()
            }
        }
    }, [])

    const onViewSectorClicked = (student: Student) => {
        contextBar.setTitle('Sectors & Courses')
        contextBar.setContent(<ViewSectorsCB student={student} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                {(subadmin?.departmentMember?.isHod ||
                    subadmin?.isManager ||
                    role === UserRoles.ADMIN) && (
                    <ActionButton
                        variant="link"
                        onClick={() => onViewSectorClicked(student)}
                        simple
                    >
                        <span className="whitespace-pre">View / Edit</span>
                    </ActionButton>
                )}
                {subadmin?.isAssociatedWithRto ? (
                    <div className="flex flex-col gap-y-0.5 max-h-16 overflow-auto custom-scrollbar">
                        {student?.courses?.map((c: Course) => (
                            <div className="bg-primaryNew px-1 py-0.5 rounded">
                                <Typography
                                    variant="xs"
                                    color="text-white"
                                    whiteSpacePre
                                >
                                    {c?.title}
                                </Typography>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex gap-x-1">
                        {student?.courses?.map((c: Course) => (
                            <CourseDot key={c?.id} course={c} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

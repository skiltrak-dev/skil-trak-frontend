import { Typography } from '@components'
import { Course, Folder } from '@types'
import Link from 'next/link'
import React from 'react'

export const ListingDocumentsTab = ({
    template,
    course,
    folder,
}: {
    template: string
    course: Course
    folder: Folder
}) => {
    return (
        <div className="flex flex-col gap-y-0.5">
            <Typography variant="small" semibold>
                {template}
            </Typography>

            <div>
                <Typography variant="badge" color={'text-gray-500'} semibold>
                    Course
                </Typography>
                <Typography variant="xs" semibold>
                    {course?.title}
                </Typography>
            </div>
            <div>
                <Typography variant="badge" color={'text-gray-500'} semibold>
                    Folder
                </Typography>
                <Link
                    href={`/portals/sub-admin/students/223?tab=submissions&course=${course?.id}&folder=${folder?.id}`}
                >
                    <Typography variant="xs" color="text-info" semibold>
                        {folder?.name}
                    </Typography>
                </Link>
            </div>
        </div>
    )
}

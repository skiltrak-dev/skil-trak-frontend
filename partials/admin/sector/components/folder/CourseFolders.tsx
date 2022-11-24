import { ActionButton, NoData } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Course, Folder } from '@types'
import { useEffect, useState } from 'react'
import { CourseFolderForm } from '../../form'
import { CourseFolder } from './CourseFolder'

export const CourseFolders = ({
  course,
  category,
}: {
  course?: Course
  category: 'IndustryCheck' | 'AssessmentEvidence'
}) => {
  const { notification } = useNotification()
  const [create, setCreate] = useState(false)
  const [addFolder, addFolderResult] = AdminApi.Folders.useCreate()
  const folders: Folder[] | undefined = course?.folders?.filter(
    (f) => f.category === category
  )

  const getFoldersTitle = () => {
    switch (category) {
      case 'IndustryCheck':
        return 'Industry Check'
      case 'AssessmentEvidence':
        return 'Assessment Evidence'
    }
  }

  const onSubmit = async (values: any) => {
    await addFolder({
      ...values,
      type: values.type.value,
      course: course?.id,
    })
  }

  const onFormCancel = () => setCreate(false)

  useEffect(() => {
    if (addFolderResult.isSuccess) {
      notification.success({
        title: 'Folder Added',
        description: 'A new folder added to course',
      })

      onFormCancel()
    } else if (addFolderResult.isError) {
      notification.error({
        title: 'Folder Add Failed',
        description: 'An error occurred while adding new folder',
      })
    }
  }, [addFolderResult])

  return (
    <div className="pt-2">
      <div className="flex justify-between items-center">
        <p className="text-xs">
          <span className="text-gray-600 font-semibold">
            {folders?.length || 0}
          </span>{' '}
          -{' '}
          <span className="text-gray-500 font-medium">
            {getFoldersTitle()} Folders
          </span>
        </p>

        <ActionButton variant="info" simple onClick={() => setCreate(true)}>
          + Add Folder
        </ActionButton>
      </div>

      {create && (
        <CourseFolderForm
          onSubmit={onSubmit}
          onCancel={onFormCancel}
          initialValues={{
            name: '',
            capacity: 0,
            type: 'docs',
            category,
            description: '',
            isRequired: false,
          }}
        />
      )}

      <>
        {!create &&
          (folders && folders.length ? (
            folders.map((f) => (
              <CourseFolder folder={f} key={f.id} course={course!!} />
            ))
          ) : (
            <NoData text="No Folder Here" />
          ))}
      </>
    </div>
  )
}

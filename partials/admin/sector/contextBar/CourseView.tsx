import { ActionButton, ContextBarLoading, Typography } from '@components'
import { AdminApi } from '@queries'

import { Course, Folder, FolderCategoryEnum } from '@types'
import { ReactElement, useState } from 'react'

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { CourseFolders } from '../components'
import { RequirementModal } from '../modals'
import { TabsStyle } from './style'

export const CourseView = ({ course }: { course: Course }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const courseDetail = AdminApi.Courses.useDetailQuery(course.id)

    const onViewRequirementClick = (course: Course) => {
        setModal(
            <RequirementModal course={course} onCancel={() => setModal(null)} />
        )
    }

    return (
        <div className="flex flex-col gap-y-6">
            {/* Context Bar Title */}
            {modal && modal}

            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Title
                </Typography>
                <Typography variant={'label'}>{course.title}</Typography>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="muted" color="text-gray-400">
                        Code
                    </Typography>
                    <Typography variant="label">{course.code}</Typography>
                </div>
                <div>
                    <Typography variant="muted" color="text-gray-400">
                        Hours
                    </Typography>
                    <Typography variant="label">{course.hours}</Typography>
                </div>
                <div>
                    <Typography variant="muted" color="text-gray-400">
                        Requirement File
                    </Typography>
                    <ActionButton
                        variant="link"
                        simple
                        onClick={() => onViewRequirementClick(course)}
                    >
                        View
                    </ActionButton>
                </div>
            </div>

            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Folders
                </Typography>
                <TabsStyle>
                    <Tabs>
                        <TabList>
                            {/* <Tab>Industry Checks</Tab> */}
                            <Tab>Assessment Evidence</Tab>
                        </TabList>

                        {/* <TabPanel>
                            {courseDetail.isLoading ? (
                                <ContextBarLoading />
                            ) : (
                                <CourseFolders
                                    course={courseDetail.data}
                                    category={FolderCategoryEnum.IndustryCheck}
                                    folders={courseDetail.data?.folders.filter(
                                        (f: Folder) =>
                                            f.category ===
                                            FolderCategoryEnum.IndustryCheck
                                    )}
                                />
                            )}
                        </TabPanel> */}
                        <TabPanel>
                            {courseDetail.isLoading ? (
                                <ContextBarLoading />
                            ) : (
                                <CourseFolders
                                    course={courseDetail.data}
                                    category={
                                        FolderCategoryEnum.AssessmentEvidence
                                    }
                                    folders={
                                        courseDetail.data?.assessmentEvidence
                                    }
                                />
                            )}
                        </TabPanel>
                    </Tabs>
                </TabsStyle>
            </div>
        </div>
    )
}

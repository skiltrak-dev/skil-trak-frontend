import Link from 'next/link'
import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { FaClipboardList } from 'react-icons/fa'
import { HiInformationCircle, HiUsers } from 'react-icons/hi2'
import { MdSpaceDashboard } from 'react-icons/md'
import { IndustryLayout } from '@layouts'
import { PageTitle, PageTitleProps } from '@components'

export const IndustryStudentsLayout = ({
    children,
    pageTitle,
}: {
    children: ReactNode
    pageTitle?: PageTitleProps
}) => {
    const defaultClasses = classNames({
        'transition-all duration-300 px-4 py-2 flex flex-col md:flex-row gap-x-2 items-center rounded-md':
            true,
    })
    return (
        <IndustryLayout>
            <div>
                <ul className="flex gap-x-2 pb-4">
                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/students/current-students"
                        >
                            <a
                                className={`text-slate-700 ${defaultClasses} hover:bg-indigo-100 hover:text-indigo-700`}
                            >
                                <span>
                                    <MdSpaceDashboard />
                                </span>
                                <span className="text-sm font-semibold">
                                    Current Students
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/students/future-candidates"
                        >
                            <a
                                className={`text-slate-700 ${defaultClasses} hover:bg-blue-100 hover:text-blue-700`}
                                id="tasks"
                            >
                                <span>
                                    <HiUsers />
                                </span>
                                <span className="text-sm font-semibold">
                                    Future Candidates
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/students/request-a-volunteer"
                        >
                            <a
                                className={`text-slate-700 ${defaultClasses} hover:bg-orange-100 hover:text-orange-700`}
                                id="students"
                            >
                                <span>
                                    <FaClipboardList />
                                </span>
                                <span className="text-sm font-semibold">
                                    Request a Volunteer
                                </span>
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link
                            legacyBehavior
                            href="/portals/industry/students/appointments"
                        >
                            <a
                                className={`text-slate-700 ${defaultClasses} hover:bg-green-100 hover:text-green-700`}
                            >
                                <span>
                                    <HiInformationCircle />
                                </span>
                                <span className="text-sm font-semibold">
                                    Appointments
                                </span>
                            </a>
                        </Link>
                    </li>
                </ul>
                {pageTitle && pageTitle.title && (
                    <div className="mb-6">
                        <PageTitle
                            title={pageTitle.title}
                            navigateBack={pageTitle?.navigateBack}
                            backTitle={pageTitle?.backTitle}
                        />
                    </div>
                )}
                {children}
            </div>
        </IndustryLayout>
    )
}

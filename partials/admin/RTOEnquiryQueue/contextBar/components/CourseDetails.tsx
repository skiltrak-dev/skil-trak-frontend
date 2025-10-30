import React from 'react'
import { Course } from '@types'
import { getSectors } from '@utils'
import { ActionButton, Card } from '@components'
import { Briefcase, Calendar, FileCheck, Paperclip } from 'lucide-react'
import { DocumentsView } from '@hooks'

export const CourseDetails = ({ enquiryDetails }: { enquiryDetails: any }) => {
    const { onFileClicked, documentsViewModal } = DocumentsView()
    return (
        <>
            {documentsViewModal}
            <Card className="border-2 border-[#0D5468]/20">
                <div className="pb-3">
                    <div className="flex items-center gap-2 text-[#0D5468] font-bold">
                        <Briefcase className="h-4 w-4" />
                        Course Details
                    </div>
                    <p className="text-xs text-[#8c8c8c] mt-1">
                        Please provide the following information
                    </p>
                </div>
                <div className="space-y-4">
                    {Object.entries(getSectors(enquiryDetails?.courses))?.map(
                        ([sector, courses]: any, idx: number) => {
                            console.log({
                                sector: enquiryDetails?.courses,
                            })
                            return (
                                <div key={idx} className="space-y-2">
                                    <h4 className="text-[#262626]">{sector}</h4>
                                    <ul className="space-y-1 pl-4">
                                        {courses?.map(
                                            (course: Course, qIdx: number) => (
                                                <li
                                                    key={qIdx}
                                                    className="text-sm text-[#595959] flex items-start gap-2"
                                                >
                                                    <FileCheck className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#0D5468]" />
                                                    <span>{course?.title}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )
                        }
                    )}

                    {enquiryDetails?.description && (
                        <div className="pt-4 border-t">
                            <label className="text-xs text-[#8c8c8c]">
                                Description
                            </label>
                            <p className="text-sm text-[#262626] leading-relaxed mt-2 whitespace-pre-line">
                                {enquiryDetails?.description}
                            </p>
                            <p className="text-xs text-[#8c8c8c] mt-2">
                                {enquiryDetails?.description?.length}
                                /1000 characters
                            </p>
                        </div>
                    )}

                    {enquiryDetails?.timeLine && (
                        <div className="pt-2">
                            <label className="text-xs text-[#8c8c8c]">
                                Select timeline
                            </label>
                            <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-[#0D5468]" />
                                {enquiryDetails?.timeLine}
                            </p>
                        </div>
                    )}

                    {enquiryDetails?.attachments &&
                        enquiryDetails?.attachments.length > 0 && (
                            <div className="pt-2">
                                <label className="text-xs text-[#8c8c8c] mb-2 block">
                                    Upload files
                                </label>
                                <div className="space-y-2">
                                    {enquiryDetails?.attachments?.map(
                                        (file: string, fIdx: number) => (
                                            <div
                                                key={fIdx}
                                                className="flex items-center justify-between gap-2 text-sm text-[#262626] bg-[#f0f2f5] px-3 py-2 rounded"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Paperclip className="h-4 w-4 text-[#0D5468]" />
                                                    <span>File</span>
                                                </div>
                                                <ActionButton
                                                    text="View File"
                                                    onClick={() =>
                                                        onFileClicked({
                                                            file: file
                                                                .replaceAll(
                                                                    '{"',
                                                                    ''
                                                                )
                                                                .replaceAll(
                                                                    '"}',
                                                                    ''
                                                                ),
                                                            extension: file
                                                                ?.split('.')
                                                                ?.reverse()[0],
                                                            type: 'all',
                                                        })
                                                    }
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </Card>
        </>
    )
}

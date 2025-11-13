'use client'

import {
    Button,
    InputContentEditorV2,
    NoData,
    ShowErrorNotifications,
    TextArea,
    draftToHtmlTextV2,
    htmlToDraftTextV2,
} from '@components'
// import { Button } from "@components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { EditorState } from 'draft-js'
import { ChevronDown, Edit, Sparkles, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RtoFileTitle } from '../cards/DocumentsSection'
import { RtoV2Api } from '@queries'
import { useNotification } from '@hooks'
import { countWords } from 'utils/functions/countWords'

export const RtoPlacementRequirements = ({ course }: any) => {
    const [open, setOpen] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState('')
    const [summaryId, setSummaryId] = useState<any>(undefined)

    const { notification } = useNotification()

    const [editorState, setEditorState] = useState<EditorState | null>(null)
    // api call to update summary
    const [updateSummary, updateSummaryResult] =
        RtoV2Api.Courses.useUpdateCourseSummary()

    // Extract summary just once
    useEffect(() => {
        const summaryObj =
            course?.rtoCourseFiles?.find(
                (f: any) => f.title === RtoFileTitle.LOGBOOK
            )?.rtoLogbookSummary?.[0] || null

        setContent(summaryObj?.summary || '')
        setSummaryId(summaryObj?.id || null)
    }, [course])

    // Load DraftJS editor only when editing starts
    useEffect(() => {
        if (isEditing) {
            setEditorState(
                content ? htmlToDraftTextV2(content) : EditorState.createEmpty()
            )
        }
    }, [isEditing])

    useEffect(() => {
        if (updateSummaryResult.isSuccess) {
            notification.success({
                title: 'Updated Successfully',
                description: 'Summary updated successfully',
            })
        }
    }, [updateSummaryResult.isSuccess])

    const handleSave = () => {
        if (editorState) {
            const html = draftToHtmlTextV2(editorState)
            setContent(html)
            // call api to save summary
            updateSummary({
                id: summaryId,
                body: {
                    summary: html,
                },
            })
        }
        setIsEditing(false)
    }
    const wordCount = isEditing
        ? countWords(editorState ? draftToHtmlTextV2(editorState) : '')
        : countWords(content)

    return (
        <>
            <ShowErrorNotifications result={updateSummaryResult} />
            <Collapsible open={open} onOpenChange={setOpen}>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl border border-accent/20 overflow-hidden">
                    {/* HEADER */}
                    <CollapsibleTrigger className="w-full p-4 flex items-start justify-between hover:bg-accent/5 transition-colors">
                        <div>
                            <label className="text-sm font-medium cursor-pointer">
                                RTO Placement Requirements
                            </label>
                            <div className="flex items-center gap-1.5 text-xs text-accent mt-1">
                                <Sparkles className="h-3 w-3" />
                                <span>Auto-populated from AI analysis</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-muted-foreground px-2 py-1 bg-background/50 rounded-md">
                                {wordCount} / 5000 words
                            </span>

                            {/* <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isEditing ? handleSave() : setIsEditing(true);
                                }}
                                className="h-8 gap-1.5"

                            >
                                <Edit className="h-3.5 w-3.5" />
                                {isEditing ? "Done" : "Edit"}
                            </Button> */}
                            <Button
                                Icon={isEditing ? Check : Edit}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    isEditing
                                        ? handleSave()
                                        : setIsEditing(true)
                                }}
                                variant="info"
                                outline
                                text={isEditing ? 'Done' : 'Edit'}
                                loading={updateSummaryResult.isLoading}
                                disabled={updateSummaryResult.isLoading}
                            />

                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                    open ? '' : '-rotate-90'
                                }`}
                            />
                        </div>
                    </CollapsibleTrigger>

                    {/* CONTENT */}
                    <CollapsibleContent>
                        <div className="px-5 pb-5 space-y-4">
                            {isEditing ? (
                                <InputContentEditorV2
                                    label="Editable Summary"
                                    content={content}
                                    onChange={setEditorState}
                                    height="h-96"
                                    showError={false}
                                />
                            ) : content?.trim() ? (
                                <div
                                    className="prose prose-sm max-w-none bg-background/30 rounded-md p-4 border border-border/40 text-xs h-96 overflow-auto resize-y min-h-52"
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                            ) : (
                                <NoData text="No placement requirements added yet." />
                            )}
                        </div>
                    </CollapsibleContent>
                </div>
            </Collapsible>
        </>
    )
}

"use client";

import React, { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@components/ui/collapsible";
import { ChevronDown, Edit } from "lucide-react";
import { Button } from "@components/ui/button";
import { EditorState } from "draft-js";
import {
    InputContentEditorV2,
    draftToHtmlTextV2,
    htmlToDraftTextV2,
} from "@components";
import { countWords } from "utils/functions/countWords";

export const AdminPlacementRequirements = ({ course }: any) => {
    const [open, setOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [content, setContent] = useState(course?.requirements ?? "");
    const [editorState, setEditorState] = useState<EditorState | null>(null);

    useEffect(() => {
        if (isEditing) {
            setEditorState(
                content ? htmlToDraftTextV2(content) : EditorState.createEmpty()
            );
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editorState) {
            const html = draftToHtmlTextV2(editorState);
            setContent(html);
        }
        setIsEditing(false);
    };


    const wordCount = isEditing
        ? countWords(editorState ? draftToHtmlTextV2(editorState) : "")
        : countWords(content);


    return (
        <Collapsible open={open} onOpenChange={setOpen} className="mx-6">
            <div className="bg-gradient-to-br from-mutedNew/30 to-mutedNew/50 rounded-xl border border-border/50 overflow-hidden">

                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-mutedNew/20 transition-colors">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium cursor-pointer">
                            TGA Admin Placement Requirements
                        </label>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-background/50 rounded-md">
                            {wordCount} / 5000 words
                        </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <Button
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
                        </Button>

                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"
                                }`}
                        />
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="px-5 pb-5 space-y-4">
                        {isEditing ? (
                            <InputContentEditorV2
                                label="Editable Requirements"
                                content={content}
                                onChange={setEditorState}
                                height="h-96"
                                showError={false}
                            />
                        ) : (
                            <div
                                className="prose prose-sm max-w-none bg-background/30 rounded-md p-4 border border-border/40 text-xs min-h-[120px] overflow-auto"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        content ||
                                        '<p class="text-muted-foreground">Enter TGA admin placement requirements...</p>',
                                }}
                            />
                        )}
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
};

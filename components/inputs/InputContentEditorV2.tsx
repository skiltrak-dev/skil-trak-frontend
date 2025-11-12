'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
    Modifier,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { EditorProps } from 'react-draft-wysiwyg';
import { Typography } from '@components/Typography';
import { InputErrorMessage } from '@components/inputs/components';
import { htmltotext } from '@utils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ✅ Lazy-load the editor
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);

// ------------------------------------------------------------------
// Utility functions
// ------------------------------------------------------------------

const stripBackgroundColors = (html: string) => {
    if (!html) return html;

    return html
        .replace(/background-color:\s*[^;]+;?/gi, '')
        .replace(/background:\s*[^;]*(?:rgb|rgba|#|hsl|hsla|[a-z]+)[^;]*;?/gi, '')
        .replace(/style="\s*"/gi, '')
        .replace(/style=''\s*/gi, '');
};

export const draftToHtmlTextV2 = (draftText: EditorState) => {
    if (!draftText) return '';
    let html = draftToHtml(convertToRaw(draftText.getCurrentContent()));
    return stripBackgroundColors(html);
};

export const htmlToDraftTextV2 = (html: string): EditorState => {
    if (!html) return EditorState.createEmpty();
    const cleaned = stripBackgroundColors(html);
    const blocks = convertFromHTML(cleaned);
    return EditorState.createWithContent(
        ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap)
    );
};

export const inputEditorErrorMessageV2 = (value: EditorState) => {
    const text = htmltotext(draftToHtmlTextV2(value));
    return text?.length > 1;
};

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

interface InputContentEditorProps {
    name?: string;
    label?: string;
    content?: string;
    onChange?: (val: EditorState) => void;
    height?: string;
    showError?: boolean;
}

export const InputContentEditorV2: React.FC<InputContentEditorProps> = ({
    name = 'editor',
    label,
    content = '',
    onChange,
    height = 'h-64',
    showError = true,
}) => {
    // Attempt to access form context (safe for standalone)
    let formContext: ReturnType<typeof useFormContext> | null = null;
    try {
        formContext = useFormContext();
    } catch {
        // Not inside a FormProvider
    }

    const error = formContext?.formState?.errors?.[name]?.message;

    // ------------------------------------------------------------------
    // Standalone Editor State Handling
    // ------------------------------------------------------------------
    const [editorState, setEditorState] = useState<EditorState>(
        content ? htmlToDraftTextV2(content) : EditorState.createEmpty()
    );

    // Sync external HTML content when it changes
    useEffect(() => {
        if (content) setEditorState(htmlToDraftTextV2(content));
    }, [content]);

    const handleStandaloneChange = (state: EditorState) => {
        setEditorState(state);
        onChange?.(state);
    };

    // ------------------------------------------------------------------
    // Paste sanitization
    // ------------------------------------------------------------------
    const handlePastedText = (
        text: string,
        html: string,
        currentState: EditorState,
        onStateChange: (state: EditorState) => void
    ) => {
        if (html) {
            const cleaned = stripBackgroundColors(html);
            const blocks = convertFromHTML(cleaned);
            const fragment = ContentState.createFromBlockArray(
                blocks.contentBlocks,
                blocks.entityMap
            );
            const contentState = currentState.getCurrentContent();
            const newContent = Modifier.replaceWithFragment(
                contentState,
                currentState.getSelection(),
                fragment.getBlockMap()
            );
            const newEditorState = EditorState.push(
                currentState,
                newContent,
                'insert-fragment'
            );
            onStateChange(
                EditorState.forceSelection(newEditorState, newContent.getSelectionAfter())
            );
            return true;
        }
        return false;
    };

    // ------------------------------------------------------------------
    // Editor Configuration
    // ------------------------------------------------------------------
    const toolbarOptions = {
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
    };

    // ------------------------------------------------------------------
    // Render Logic
    // ------------------------------------------------------------------

    const EditorWrapper = (props: { value: EditorState; onChange: (v: EditorState) => void }) => (
        <Editor
            editorState={props.value}
            onEditorStateChange={props.onChange}
            handlePastedText={(text, html) =>
                handlePastedText(text, html, props.value, props.onChange)
            }
            spellCheck
            toolbar={toolbarOptions}
            wrapperClassName={`border rounded-md ${height} overflow-auto ${error ? 'border-error' : 'border-border'
                }`}
            editorClassName="!overflow-auto custom-scrollbar !h-[calc(100%-60px)] px-3 py-2"
            editorStyle={{ minHeight: '200px' }}
        />
    );

    // ------------------------------------------------------------------
    // Main Return
    // ------------------------------------------------------------------
    return (
        <div className="space-y-2">
            {label && <Typography variant="label">{label}</Typography>}

            {formContext?.control ? (
                <Controller
                    name={name}
                    control={formContext.control}
                    render={({ field }) => (
                        <EditorWrapper
                            value={field.value || EditorState.createEmpty()}
                            onChange={(v) => {
                                field.onChange(v);
                                onChange?.(v);
                            }}
                        />
                    )}
                />
            ) : (
                <EditorWrapper value={editorState} onChange={handleStandaloneChange} />
            )}

            {showError && formContext && <InputErrorMessage name={name} />}
        </div>
    );
};

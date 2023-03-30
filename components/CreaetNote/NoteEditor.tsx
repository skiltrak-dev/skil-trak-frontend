import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    {
        ssr: false,
    }
)

const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default

import {
    ContentState,
    convertFromHTML,
    convertToRaw,
    EditorState,
} from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Typography } from '@components/Typography'

export const NoteEditor = ({
    name,
    label,
}: {
    name: string
    label: string
}) => {
    const methods = useFormContext()
    return (
        <div>
            <Typography variant={'label'}>{label}</Typography>
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => {
                    console.log('field', field.value)
                    return (
                        <Editor
                            editorStyle={{
                                padding: '0px 10px 10px',
                                height: '200px',
                            }}
                            toolbar={{
                                options: [
                                    'inline',
                                    'blockType',
                                    'fontSize',
                                    'list',
                                    'textAlign',
                                    'history',
                                ],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                            editorState={field.value}
                            wrapperClassName="border rounded-md"
                            editorClassName="overflow-hidden h-20"
                            onEditorStateChange={field.onChange} // send data with the onChagne
                        />
                    )
                }}
            />
        </div>
    )
}

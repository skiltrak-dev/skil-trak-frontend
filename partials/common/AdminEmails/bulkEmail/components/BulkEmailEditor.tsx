import { Controller, useFormContext } from 'react-hook-form'

import dynamic from 'next/dynamic'

import { EditorProps } from 'react-draft-wysiwyg'
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    {
        ssr: false,
    }
)

const htmlToDraft =
    typeof window === 'object' && require('html-to-draftjs').default

import { Typography } from '@components/Typography'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useEffect } from 'react'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'

export const BulkEmailEditor = ({
    name,
    label,
    content,
}: {
    name: string
    label?: string
    content: any
}) => {
    const methods = useFormContext()


    return (
        <div>
            <Typography variant={'label'}>{label}</Typography>
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => {
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

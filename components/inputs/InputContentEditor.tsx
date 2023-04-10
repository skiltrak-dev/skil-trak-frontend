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
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from 'draft-js'
import { InputErrorMessage } from '@components/inputs/components'
import draftToHtml from 'draftjs-to-html'

export const draftToHtmlText = (draftText: any) => {
    let content = ''
    if (draftText) {
        content = draftToHtml(convertToRaw(draftText?.getCurrentContent()))
    }
    return content
}

export const htmlToDraftText = (
    methods: any,
    content: string,
    name: string
) => {
    if (content) {
        const blocksFromHTML = convertFromHTML(content)
        const bodyValue = EditorState.createWithContent(
            ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
        )
        methods.setValue(name, bodyValue)
    }
}

export const InputContentEditor = ({
    name,
    label,
    content,
}: {
    name: string
    label?: string
    content?: any
}) => {
    const methods = useFormContext()

    return (
        <div>
            <Typography variant={'label'}>{label}</Typography>
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => {
                    console.log('ffff', typeof field.value)
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
                            editorState={field?.value}
                            wrapperClassName="border rounded-md"
                            editorClassName="overflow-hidden h-20"
                            onEditorStateChange={field?.onChange} // send data with the onChagne
                        />
                    )
                }}
            />
            <InputErrorMessage name={name} />
        </div>
    )
}

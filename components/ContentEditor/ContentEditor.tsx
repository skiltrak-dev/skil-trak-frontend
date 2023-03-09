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

import { ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface ContentEditor {
    label?: string
    content?: any
    setContent?: Function
    result?: any
}
export const ContentEditor = ({
    label,
    content,
    setContent,
    result,
}: ContentEditor) => {
    let raw = convertToRaw(ContentState.createFromText(''))
    if (htmlToDraft) {
        const blocksFromHtml = htmlToDraft(content || '')
        const { contentBlocks, entityMap } = blocksFromHtml

        const existingContentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        )
        raw = convertToRaw(existingContentState)
    }

    const [editorState, setEditorState] = useState<any>(raw)
    const [contentState, setContentState] = useState(EditorState.createEmpty())
    const [contentChange, setContentChange] = useState(false)

    useEffect(() => {
        if (setContent) {
            setContent(
                contentChange
                    ? draftToHtml(
                          convertToRaw(contentState.getCurrentContent())
                      )
                    : content
            )
        }
    }, [contentState])

    useEffect(() => {
        if (result.isSuccess) {
            setEditorState(null)
            setContentState(EditorState.createEmpty())
        }
    }, [result])

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
        setContentState(editorState)
        setContentChange(true)
    }

    return (
        <div className="mb-4">
            {label && <p className="text-sm font-medium mb-2">{label}</p>}
            <Editor
                defaultContentState={editorState}
                // toolbarStyle={{ border: 'none', borderRadius: '16px' }}
                wrapperClassName="border rounded-md"
                editorClassName="min-h-[128px] max-h-[250px] overflow-y-auto  px-2 custom-scrollbar"
                editorStyle={{ fontSize: '14px' }}
                onEditorStateChange={onEditorStateChange}
                placeholder="Write your requirements here"
                // toolbar={{
                //   options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
                //   inline: {
                //     options: ['bold', 'italic', 'underline'],
                //   },
                //   list: { inDropdown: true },
                //   textAlign: { inDropdown: true },
                // }}
            />
        </div>
    )
}

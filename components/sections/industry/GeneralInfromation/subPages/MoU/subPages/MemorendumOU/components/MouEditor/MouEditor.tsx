import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

// styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Button } from 'components'

export const MouEditor = ({
  content,
  saveContent,
  setEditMou,
  setSaveContentButton,
}: any) => {
  // const blocksFromHtml = htmlToDraft(content || '')
  // const { contentBlocks, entityMap } = blocksFromHtml
  // const contentState = ContentState.createFromBlockArray(
  //   contentBlocks,
  //   entityMap
  // )

  // const raw = convertToRaw(contentState)

  // const [editorState, setEditorState] = useState(raw)
  // const [newContentState, setNewContentState] = useState(
  //   EditorState.createEmpty()
  // )
  // const [isContentChange, setIsContentChange] = useState(false)

  // const _html = draftToHtml(convertToRaw(newContentState.getCurrentContent()))
  // useEffect(() => {
  //   if (setSaveContentButton) {
  //     setSaveContentButton(
  //       <>
  //         <Button
  //           onClick={() => {
  //             saveContent(isContentChange ? _html : content)
  //             setEditMou(false)
  //           }}
  //           text={'Save'}
  //         />
  //       </>
  //     )
  //   }
  // }, [
  //   _html,
  //   content,
  //   setEditMou,
  //   saveContent,
  //   newContentState,
  //   isContentChange,
  //   setSaveContentButton,
  // ])

  // const onEditorStateChange = (editorState: any) => {
  //   setEditorState(editorState)
  //   setNewContentState(editorState)
  //   setIsContentChange(true)
  // }

  // console.log('editorStateeditorState', editorState)

  return (
    <>
      {/* <Editor
        defaultContentState={editorState}
        toolbarClassName="border"
        wrapperClassName="border"
        editorClassName="h-80 px-5 remove-scrollbar"
        onEditorStateChange={onEditorStateChange}
      /> */}
    </>
  )
}

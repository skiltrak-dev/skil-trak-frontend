import { EmptyData, LoadingAnimation, Note, NoteForm } from '@components'
import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'

import { Note as NoteType } from '@types'

export const NotesTab = ({ id }: { id: any }) => {
  const contextBar = useContextBar()
  const approvedUser = true

  const notes = AdminApi.Notes.useList(id, {
    skip: !id,
  })

  return (
    <div
      className={`flex gap-x-2.5 w-full ${
        contextBar.isVisible ? 'flex-col' : 'flex-row'
      }`}
    >
      <div
        className={`${
          contextBar.isVisible ? 'w-full' : !approvedUser ? 'w-full' : 'w-[71%]'
        } bg-gray-50 rounded-lg p-2`}
      >
        {/* {notes.isError && !notes.length > 0 && <TechnicalError />} */}
        <div className={`flex flex-col gap-y-2.5 h-full `}>
          {notes?.isLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingAnimation />
            </div>
          ) : notes?.data && notes?.data.length ? (
            notes.data.map((note: NoteType) => (
              <Note key={note.id} note={note} />
            ))
          ) : (
            <EmptyData
              title="No Notes Attached"
              description="No any notes has been attached to this user"
            />
          )}
        </div>
      </div>
      {approvedUser && (
        <div className={`${contextBar.isVisible ? 'w-full' : 'w-[29%]'}`}>
          <NoteForm id={id}/>
        </div>
      )}
    </div>
  )
}

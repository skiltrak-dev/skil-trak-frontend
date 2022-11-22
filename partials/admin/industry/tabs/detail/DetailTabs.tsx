import { TabNavigation, TabProps } from '@components'
import { MailsTab } from './MailsTab'
import { NotesTab } from './NotesTab'

export const DetailTabs = ({
  id,
}: {
  id: number | string | string[] | undefined
}) => {
  const tabs: TabProps[] = [
    {
      label: 'Notes',
      href: { query: { tab: 'notes', id } },
      element: <NotesTab />,
    },
    {
      label: 'Mails',
      href: { query: { tab: 'mails', id } },
      element: <MailsTab />,
    },
  ]

  return (
    <div>
      <TabNavigation tabs={tabs}>
        {({ header, element }: any) => {
          return (
            <div>
              <div>{header}</div>
              <div className="p-4">{element}</div>
            </div>
          )
        }}
      </TabNavigation>
    </div>
  )
}

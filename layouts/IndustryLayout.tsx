import { PageTitle } from '@components'
import { IndustryNavbar } from '@components'
import { ReactNode } from 'react'
import { UserLayout } from './UserLayout'

interface IndustryLayoutProps {
  title?: string
  children: ReactNode
}
export const IndustryLayout = ({ title, children }: IndustryLayoutProps) => {
  return (
    <UserLayout>
      <div className="px-16">
        <div className="mb-6">
          <IndustryNavbar />
        </div>
        {title && (
          <div className="mb-6">
            <PageTitle title={title} />
          </div>
        )}
        <div>{children}</div>
      </div>
    </UserLayout>
  )
}

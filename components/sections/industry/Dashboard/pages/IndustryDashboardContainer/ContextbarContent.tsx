import { Typography, SidebarCalendar } from '@components'

export const ContextBarContent = () => {
  return (
    <>
      <SidebarCalendar />
      <Typography variant="muted" color="gray">
        Other Links
      </Typography>
      {/* <OtherDocumentLinks /> */}
    </>
  )
}

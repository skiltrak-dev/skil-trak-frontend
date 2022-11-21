// import { NavLink } from "react-router-dom";

// Icons
import { MdSimCardDownload } from 'react-icons/md'

// components
import { Button, Card, Typography } from '@components'

interface DocumentViewProps {
  title?: string
  children: any
  downloadLink?: string
}

export const DocumentView = ({
  title,
  children,
  downloadLink,
}: DocumentViewProps) => {
  const saveFile = () => {
    // Save file here
  }

  return (
    <Card>
      <div className="flex justify-between items-center">
        <Typography variant={'h4'}>{title}</Typography>

        {downloadLink && (
          <Button
            variant={'action'}
            Icon={MdSimCardDownload}
            onClick={saveFile}
            text={'Download'}
          />
        )}
      </div>

      <div className="mt-6">{children}</div>
    </Card>
  )
}

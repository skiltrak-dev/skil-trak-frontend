import { PinnedNotes } from '@components/sections/subAdmin/components'
import { OfficeShiftTimings } from './OfficeShiftTimings'

type Props = {
  industryProfile: any
}

export const IndustryProfileOverview = ({ industryProfile }: Props) => {
  return (
    <div>
      <PinnedNotes id={industryProfile?.user?.id} />
      <div className="flex items-center gap-x-4 justify-between mt-6">
        <OfficeShiftTimings title="Office Timings" />
        <OfficeShiftTimings title="Free shifts" />
      </div>
    </div>
  )
}

import { OfficeShiftTimings } from "./OfficeShiftTimings"


type Props = {}

export const IndustryProfileOverview = (props: Props) => {

  return (
    <div className="flex items-center gap-x-4 justify-between mt-6">
      <OfficeShiftTimings title="Office Timings" />
      <OfficeShiftTimings title="Free shifts" />
    </div>
  )
}

import { PinnedNotes } from '@components/sections/subAdmin/components'
import { OfficeShiftTimings } from '../../components/OfficeShiftTimings'
import { useRouter } from 'next/router'

type Props = {
    industryProfile: any
}

export const IndustryProfileOverview = ({ industryProfile }: Props) => {
    const router = useRouter()
    return (
        <div>
            <PinnedNotes
                id={industryProfile?.user?.id}
                link={`/portals/sub-admin/users/industries/${router?.query?.id}?tab=notes`}
            />
            <div className="flex items-center gap-x-4 justify-between mt-6">
                <OfficeShiftTimings title="Office Timings" />
                <OfficeShiftTimings title="Free shifts" />
            </div>
        </div>
    )
}

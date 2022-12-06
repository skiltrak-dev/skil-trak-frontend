import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import moment from 'moment'
import { BsDot } from 'react-icons/bs'
import { Actions, IndustryCard, SmallIndustryCard } from './components'

export const Industries = ({
  industries,
  workplaceId,
  appliedIndustry,
}: any) => {
  // const ii = industries.map((i) => i.industryResponse)
  // const industryResponse = ii.includes('rejected') || ii.includes('noResponse')

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant={'xs'} color={'text-gray-400'}>
          Suggested Industries
        </Typography>
        <Typography variant={'small'} color={'text-info'}>
          <span className="font-semibold">+ Add Industry</span>
        </Typography>
      </div>

      {/* industries List */}
      <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col gap-y-1">
        {/* {appliedIndustry} */}
        {appliedIndustry && <IndustryCard industry={appliedIndustry} />}

        {/* Book Appointment Button */}
        <Actions appliedIndustry={appliedIndustry} workplaceId={workplaceId} />

        {appliedIndustry?.industryResponse !== 'approved' ? (
          industries && industries.length > 0 ? (
            appliedIndustry?.interview &&
            !industries
              .map((i: any) => i.industryResponse)
              .includes('noResponse') ? (
              <>
                <Typography variant={'xs'} color={'text-gray-400'}>
                  Other Suggested Industries
                </Typography>
                <div className="flex items-center flex-wrap gap-2">
                  {industries
                    ?.filter((i: any) => !i.applied)
                    .map((industry: any, i: number) => (
                      <SmallIndustryCard
                        key={industry?.id}
                        industry={industry}
                      />
                    ))}
                </div>
              </>
            ) : (
              industries
                ?.filter((i: any) => !i.applied)
                .map((industry: any, i: number) => (
                  <IndustryCard
                    key={industry.id}
                    industry={industry}
                    appliedIndustry={appliedIndustry}
                  />
                ))
            )
          ) : (
            'No Industry Found'
          )
        ) : null}
      </div>
    </div>
  )
}

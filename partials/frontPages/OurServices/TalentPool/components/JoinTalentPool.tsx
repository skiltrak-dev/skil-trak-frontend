import React from 'react'
import { TalentPoolCard } from '../Card'
import { Typography } from '@components'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

export const JoinTalentPool = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <TalentPoolCard
            title="Join SkilTrak Today"
            {...(!isMobile
                ? {
                      center: true,
                  }
                : {})}
        >
            <div className="flex flex-col gap-y-4">
                <Typography
                    color={'text-[#56585a]'}
                    variant="label"
                    {...(!isMobile
                        ? {
                              center: true,
                          }
                        : {})}
                >
                    Whether you're a job seeker embarking on a new career
                    journey or an industry leader seeking top talent, SkilTrak's
                    Talent Pool is your gateway to unparalleled opportunities
                    and connections. Register with us today to unlock the full
                    potential of our Talent Pool and discover a world of
                    possibilities.
                </Typography>

                <Typography
                    color={'text-[#56585a]'}
                    variant="label"
                    {...(!isMobile
                        ? {
                              center: true,
                          }
                        : {})}
                >
                    At SkilTrak, we're committed to shaping the future of work
                    by empowering individuals and industries to thrive in an
                    ever-evolving landscape. Join us on this journey and
                    experience the transformative power of the Talent Pool
                    firsthand. Together, we'll shape a path towards a brighter
                    future, capturing each opportunity as a stepping stone
                    towards collective success.
                </Typography>
            </div>
        </TalentPoolCard>
    )
}

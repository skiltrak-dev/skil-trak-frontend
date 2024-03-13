import { Button, Typography } from '@components'
import { MediaQueries } from '@constants'
import { useMediaQuery } from 'react-responsive'

export const JoinTalentPool = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div>
            <div className="flex flex-col gap-y-3">
                <div data-aos="fade-up">
                    <Typography
                        color={'text-[#25566B]'}
                        variant="h3"
                        bold
                        center
                    >
                        Join SkilTrak Today{' '}
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-4" data-aos="fade-up">
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
                        journey or an industry leader seeking top talent,
                        SkilTrak's Talent Pool is your gateway to unparalleled
                        opportunities and connections. Register with us today to
                        unlock the full potential of our Talent Pool and
                        discover a world of possibilities.
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
                        At SkilTrak, we're committed to shaping the future of
                        work by empowering individuals and industries to thrive
                        in an ever-evolving landscape. Join us on this journey
                        and experience the transformative power of the Talent
                        Pool firsthand. Together, we'll shape a path towards a
                        brighter future, capturing each opportunity as a
                        stepping stone towards collective success.
                    </Typography>
                </div>
            </div>

            <div
                className="flex items-center justify-center mt-8"
                data-aos="fade-up"
            >
                <Button text="Join Talent Pool" />
            </div>
        </div>
    )
}

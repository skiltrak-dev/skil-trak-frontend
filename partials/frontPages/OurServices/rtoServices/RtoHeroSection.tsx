import { Button, Typography } from '@components'
import { BookADemoModal } from '@components/site/v3/hero/BookADemoModal'
import Modal from '@modals/Modal'
import Link from 'next/link'

export const RtoHeroSection = () => {
    return (
        <div
            className="h-[600px] "
            style={{
                backgroundImage:
                    'url(/images/site/services/rto-services/rto-services-hero-bg.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="md:mx-auto md:max-w-7xl py-6 md:py-10 px-4 md:px-0 h-full relative">
                <div className="space-y-4 md:space-y-14 w-xl">
                    <h1 className="text-white font-bold text-2xl md:text-5xl">
                        Empowering RTOs With Seamless <br /> Placement Solutions
                    </h1>

                    <div className="space-y-6">
                        <Typography variant="h2" color={'text-primary'}>
                            Built By Educators, for educators
                        </Typography>
                        <p className={'text-white leading-8 md:w-[50rem]'}>
                            SkilTrak streamlines student placements, ensures
                            Eligibility, and provides real-time progress
                            Tracking across every aspect of work-based training.
                            Whether you're managing high volumes of placements,
                            liaising with host employers, or documenting
                            Placement Agreements, SkilTrak’s intuitive platform
                            keeps you in control.
                        </p>
                    </div>
                    <div className="mt-10 flex justify-center items-center gap-x-2">
                        <Link
                            href="/auth/signup/rto?step=account-info"
                            className="inline-block"
                        >
                            <Button text="Sign Up" />
                        </Link>

                        <Modal>
                            <Modal.Open opens="bookADemo">
                                <Button text="Schedule For Demo" />
                            </Modal.Open>

                            <Modal.Window name="bookADemo" noPadding>
                                <BookADemoModal />
                            </Modal.Window>
                        </Modal>
                    </div>
                </div>
                <div
                    // style={{
                    //     backgroundImage:
                    //         'url(/images/site/services/student-services/hero/ellipse.png)',
                    //     backgroundSize: 'cover',
                    //     backgroundRepeat: 'no-repeat',
                    // }}
                    className="relative self-end md:block hidden"
                ></div>
            </div>
        </div>
    )
}

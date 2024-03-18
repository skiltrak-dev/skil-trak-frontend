import { Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import {
    WorkBaseInfoIndustries,
    WorkBaseInfoRTOs,
    WorkBaseInfoStudent,
    WorkbaseQuery,
} from './components'

export const WorkBaseTraining = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    return (
        <div className="relative">
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[310px] right-0 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[700px] -left-40 -z-10"
            />
            <Image
                src={'/images/site/services/webbasetraining/boxShadow.png'}
                alt={'Shadow'}
                width={0}
                height={0}
                sizes={'100vh 100vw'}
                className="w-[438px] h-[494px] absolute top-[1280px] right-0 -z-10"
            />
            <div className="ourServicesBg bg-cover pt-5 md:pt-10 xl:pt-[75px] pb-10 lg:pb-40 relative">
                <div className="max-w-7xl mx-auto ">
                    <div className="max-w-3xl mx-auto flex flex-col gap-y-5 px-8 md:px-6 xl:px-0">
                        <Typography bold center>
                            <span className="text-xl md:text-3xl lg:text-[47px]">
                                Work Based Training
                            </span>
                        </Typography>
                        <div className="flex flex-col gap-y-2.5">
                            <Typography
                                center
                                // variant={isMobile ? 'label' : 'body'}
                                color={'text-[#25566B]'}
                                bold
                            >
                                <span className="text-[21px]">
                                    Welcome to our Work Based Training (WBT)
                                    program. involved.
                                </span>
                            </Typography>
                            <Typography
                                center
                                variant={isMobile ? 'label' : 'body'}
                                color={'text-[#56585a]'}
                            >
                                Where we connect students, Registered Training
                                Organisations (RTOs), and industries, ensuring a
                                symbiotic relationship that benefits all parties
                                involved.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            {/* <div className="relative max-w-7xl mx-auto  lg:-mt-32 mb-10">
                <div className="hidden lg:block absolute top-0 left-0 -mt-32 lg:-mt-0">
                    <Image
                        src={`/images/site/services/webbasetraining/border.png`}
                        alt={''}
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        className={'w-full h-full'}
                    />
                </div>
            </div> */}
            {/* Data */}

            <div className="flex flex-col gap-y-9 lg:gap-y-14 pb-8 lg:-mt-20">
                <WorkBaseInfoStudent />
                <WorkBaseInfoRTOs />
                <WorkBaseInfoIndustries />
                <WorkbaseQuery />
            </div>
        </div>
    )
}

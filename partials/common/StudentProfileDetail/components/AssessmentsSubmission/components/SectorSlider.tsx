import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Typography } from '@components'
import { Sector } from '@types'
import { SectorCard } from '../Cards'
import { SliderStyleContainer } from '../styles'

interface SectorSliderProps {
    sectors: Sector[] | undefined
    selectedSector: number | null
    onSectorChange: (sectorId: number) => void
    onSlideChange: (sectorId: number) => void
}

export const SectorSlider: React.FC<SectorSliderProps> = ({
    sectors,
    selectedSector,
    onSectorChange,
    onSlideChange,
}) => {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const iconClasses =
        'border border-secondary absolute top-1/2 -mt-2 z-10 cursor-pointer bg-primaryNew text-white shadow-md rounded-full hover:scale-150 transition-all hover:opacity-100 w-5 h-5 flex justify-center items-center'

    return (
        <div className="border-r border-secondary-dark px-4 py-2.5">
            <Typography variant="small" medium>
                Sectors
            </Typography>
            <div className="mt-2.5 px-2 gap-2.5">
                <SliderStyleContainer className="relative">
                    <div className="swiper-container w-full relative">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            slidesPerGroup={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onSwiper={(swiper: any) => {
                                setTimeout(() => {
                                    swiper.params.navigation.prevEl =
                                        navigationPrevRef.current
                                    swiper.params.navigation.nextEl =
                                        navigationNextRef.current
                                    swiper.navigation.destroy()
                                    swiper.navigation.init()
                                    swiper.navigation.update()
                                })
                            }}
                            onSlideChange={(e: any) => {
                                if (sectors && sectors?.length > 0) {
                                    onSlideChange(sectors[e.activeIndex]?.id)
                                }
                            }}
                            modules={[Navigation]}
                            className="mySwiper static"
                        >
                            {sectors?.map((sector: Sector) => (
                                <SwiperSlide key={sector?.id}>
                                    <SectorCard
                                        onClick={() =>
                                            onSectorChange(sector.id)
                                        }
                                        sector={sector}
                                        active={selectedSector === sector?.id}
                                    />
                                </SwiperSlide>
                            ))}
                            <div
                                ref={navigationPrevRef}
                                className={`${iconClasses} left-0 lg:-left-3`}
                            >
                                <MdKeyboardArrowLeft className="text-2xl text-white" />
                            </div>
                            <div
                                ref={navigationNextRef}
                                className={`${iconClasses} right-0 lg:-right-3`}
                            >
                                <MdKeyboardArrowRight className="text-2xl text-white" />
                            </div>
                        </Swiper>
                    </div>
                </SliderStyleContainer>
            </div>
        </div>
    )
}

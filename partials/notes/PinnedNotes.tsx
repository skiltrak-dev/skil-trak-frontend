import { CommonApi } from '@queries'
import { useCallback, useRef } from 'react'
import { Navigation, Pagination, FreeMode } from 'swiper'
import { SwiperContainer } from './style'
import { PinedNotesStyles } from '@components/sections/subAdmin/components/PinnedNotes/style'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NotesCard } from '@components/sections/subAdmin'

export const PinnedNotes = ({
    id = -1,
    onHandleScroll,
    link,
}: {
    id: number | string | string[] | undefined
    onHandleScroll?: any
    link?: any
}) => {
    const pinnedNotes = CommonApi.Notes.usePinned(id, {
        skip: !id,
    })

    const swiperRef = useRef<any>(null)

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slidePrev()
    }, [])

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slideNext()
    }, [])

    // <SwiperContainer className="mt-4 relative">
    //     <PinedNotesStyles className="mt-4 relative">
    //         {pinnedNotes.data && (
    //             <Swiper
    //                 slidesPerView={3}
    //                 spaceBetween={16}
    //                 pagination={{
    //                     clickable: true,
    //                 }}
    //                 modules={[Navigation]}
    //                 className="mySwiper static"
    //             >
    //                 {pinnedNotes.data?.map((note) => (
    //                     <SwiperSlide key={note.id} className={'h-full mb-4'}>
    //                         <NotesCard note={note} pinnedNote />
    //                     </SwiperSlide>
    //                 ))}
    //             </Swiper>
    //         )}
    //     </PinedNotesStyles>
    // </SwiperContainer>

    return (
        <div className="relative">
            {pinnedNotes &&
                pinnedNotes?.data &&
                pinnedNotes?.data.length > 0 && (
                    <>
                        <PinedNotesStyles className="mt-4 relative">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={8}
                                freeMode={true}
                                // pagination={{
                                //     clickable: true,
                                // }}
                                // navigation={true}
                                ref={swiperRef}
                                modules={[FreeMode, Pagination]}
                                className="mySwiper static"
                            >
                                {pinnedNotes?.data?.map((note: any) => (
                                    <SwiperSlide
                                        key={note.id}
                                        className="h-full mb-4"
                                    >
                                        <NotesCard
                                            note={note}
                                            pinnedNote
                                            onHandleScroll={onHandleScroll}
                                            link={link}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </PinedNotesStyles>
                        <div className="text-2xl absolute flex justify-between w-full top-1/2 -translate-y-2/4 z-30">
                            <button
                                onClick={handlePrev}
                                className="transition-all duration-300 opacity-25 hover:opacity-75 -translate-x-2"
                            >
                                <FaChevronCircleLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                className="transition-all duration-300 opacity-25 hover:opacity-75 translate-x-2"
                            >
                                <FaChevronCircleRight />
                            </button>
                        </div>
                    </>
                )}
        </div>
    )
}

import { useCallback, useRef } from 'react'
import { FreeMode, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

// components
import { LoadingAnimation } from '@components/LoadingAnimation'

// natives
import { NotesCard } from '../NotesCard'
import { PinedNotesStyles } from './style'

// query
import { CommonApi } from '@queries'

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

export const PinnedNotes = ({ id, link }: { id: any; link: any }) => {
    const swiperRef = useRef<any>(null)

    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slidePrev()
    }, [])

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.swiper.slideNext()
    }, [])

    const notes = CommonApi.Notes.usePinned(id, { skip: !id })
    return notes?.isLoading ? (
        <LoadingAnimation />
    ) : notes?.data && notes?.data?.length > 0 ? (
        <>
            <div className="mb-3">
                <p className="text-xs font-semibold text-gray-500">
                    <span className="text-gray-900">
                        {notes.data && notes.data.length
                            ? notes.data.length
                            : 0}
                    </span>{' '}
                    Pinned Notes
                </p>
            </div>
            <div className="relative">
                <PinedNotesStyles className="mt-4 relative">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={8}
                        freeMode={true}
                        // pagination={{
                        //   clickable: true,
                        // }}
                        // navigation={true}
                        ref={swiperRef}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper static"
                    >
                        {notes?.data?.map((note: any) => (
                            <SwiperSlide key={note.id} className="h-full mb-4">
                                <NotesCard note={note} pinnedNote link={link} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </PinedNotesStyles>

                <div className="text-2xl absolute flex justify-between w-full top-2/4 -translate-y-2/4 z-30">
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
            </div>
        </>
    ) : null
}

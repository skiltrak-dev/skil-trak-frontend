import React from 'react'
import { FreeMode, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

// components
import { Typography } from '@components/Typography'

// natives
import { PinedNotesStyles } from './style'
import { NotesCard } from '../NotesCard'

// query
import { useGetNotesQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

export const PinnedNotes = ({ id }: any) => {
  const notes = useGetNotesQuery({ id, pinned: true }, { skip: !id })
  return notes?.isLoading ? (
    <LoadingAnimation />
  ) : notes?.data && notes?.data?.length > 0 ? (
    <>
      <div className="mb-3">
        <Typography variant={'muted'} color={'text-gray-400'}>
          Pinned Notes
        </Typography>
      </div>
      <PinedNotesStyles className="mt-4 relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          freeMode={true}
          // pagination={{
          //   clickable: true,
          // }}
          // navigation={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper static"
        >
          {notes?.data?.map((note: any) => (
            <SwiperSlide key={note.id} className="h-full">
              <NotesCard note={note} pinnedNote />
            </SwiperSlide>
          ))}
        </Swiper>
      </PinedNotesStyles>
    </>
  ) : null
}

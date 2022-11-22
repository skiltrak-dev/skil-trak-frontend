import { Note } from '@components'
import { AdminApi } from '@queries'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperContainer } from './style'

export const PinnedNotes = ({
  id = -1,
}: {
  id: number | string | string[] | undefined
}) => {
  const pinnedNotes = AdminApi.Notes.usePinned(id, {
    skip: !id,
  })

  return (
    
      <SwiperContainer className="mt-4 relative">
        <div className='swiper-container'>
        {pinnedNotes.data && (
          <Swiper
            slidesPerView={3}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {pinnedNotes.data?.map((note) => (
              <SwiperSlide key={note.id} className={'relative'}>
                <Note note={note} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        </div>
      </SwiperContainer>
    
  )
}

import { Typography } from '@components/Typography'
import { AppointmentTypeCard } from './AppointmentTypeCard'

type Props = {}

export const AppointmentType = (props: Props) => {
    const appointmentTypes = [
        {
            imageUrl: '/images/card-images/video-icon.png',
            selectedImageUrl: '/images/card-images/video-image.png',
            post: 'Video Conference',
        },
        {
            imageUrl: '/images/card-images/box-icon.png',
            selectedImageUrl: '/images/card-images/box-image.png',
            post: 'Work Place Visit',
        },
        {
            imageUrl: '/images/card-images/save-icon.png',
            selectedImageUrl: '/images/card-images/save-image.png',
            post: 'Student Observation',
        },
        {
            imageUrl: '/images/card-images/phone-icon.png',
            selectedImageUrl: '/images/card-images/phone-image.png',
            post: 'Phone Consultation',
        },
    ]
    return (
        <div className="mt-5">
            <Typography variant="body" color="text-black">
                What kind of appointment you want to book?
            </Typography>
            <div className="flex gap-x-4 items-center mt-1">
                {appointmentTypes.map((appointmentType, index) => (
                    <AppointmentTypeCard
                        key={index}
                        post={appointmentType.post}
                        imageUrl={appointmentType.imageUrl}
                        selectedImageUrl={appointmentType.selectedImageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

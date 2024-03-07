import { StudentAvatar, Typography } from '@components'

export const HiredProfileCard = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg">
            <div className='px-8'>
                <div>
                    <StudentAvatar
                        imageUrl={``}
                        // name={`${profile?.student?.user?.name}`}
                        // gender={`${profile?.student?.gender}`}
                        name="John Doe"
                        gender={'Male'}
                    />
                </div>
                <div className="mt-5 mb-3">
                    <div className="flex flex-col gap-y-1">
                        <Typography variant="title">John Doe</Typography>
                        <Typography variant="muted">
                            Westbournegrammarschool@gmail.com
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2.5">
                    <div>
                        <Typography variant="small">Phone Number</Typography>
                        <Typography variant="small">+6125121451523</Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}

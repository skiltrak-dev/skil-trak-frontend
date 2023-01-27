import { InitialAvatar, Typography } from '@components'

export const MOUCell = ({ mou }: any) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <InitialAvatar name={mou?.name} imageUrl={mou?.avatar} />
                <div>
                    <Typography color={'black'}> {mou?.name} </Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        {mou.email}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

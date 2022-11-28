import { Typography } from '@components'

export const MOUCell = ({ mou }: any) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <img
                    className="rounded-full w-7 h-7"
                    src={mou.image || 'https://placeimg.com/100/100/any'}
                    alt={mou.name}
                />
                <div>
                    <Typography color={'black'}> {mou.name} </Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        {mou.email}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

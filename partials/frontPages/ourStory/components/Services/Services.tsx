import { Typography } from '@components'
import { ServiceCard } from './card'

export const Services = () => {
    const serviceData = [
        {
            text: 'Work Placements',
            direction: 'left',
            bgColor: 'bg-gradient-to-r from-[#893D00] to-[#F7A619]',
        },
        {
            text: 'TALENT POOL',
            direction: 'right',
            bgColor: 'bg-gradient-to-r from-[#000000] to-[#666666]',
        },
        {
            text: 'Employment Hub',
            direction: 'left',
            bgColor: 'bg-gradient-to-r from-[#666666] to-[#0D3958]',
        },
        {
            text: 'Upskill Traineeship Program',
            direction: 'right',
            bgColor: 'bg-gradient-to-r from-[#F7A619] to-[#893D00]',
        },
    ]
    return (
        <div className="mt-10">
            <Typography variant="h2" center>
                SERVICES
            </Typography>
            <div className="mt-4">
                {serviceData?.map((data, i) => (
                    <ServiceCard key={i} data={data} />
                ))}
            </div>
        </div>
    )
}

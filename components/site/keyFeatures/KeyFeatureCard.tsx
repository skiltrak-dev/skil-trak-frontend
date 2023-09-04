import { Typography } from '@components/Typography'
import Link from 'next/link'

export const KeyFeatureCard = ({ icon, title, content, color, link }: any) => {

  
    return (
        <Link href={`features/#${link}`} id={link}>
            <div className={`${color} rounded-xl p-6 feat-card`}>
                <div className="mb-4 text-3xl">{icon}</div>
                <div className="mb-2">
                    <h4 className='text-lg font-semibold'>{title}</h4>
                </div>
                <div>
                    <p className='text-xs'>{content}</p>
                </div>
            </div>
        </Link>
    )
}

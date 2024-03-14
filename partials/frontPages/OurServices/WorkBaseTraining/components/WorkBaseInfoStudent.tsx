import Image from 'next/image'
import { WorkBaseInfoCardData } from './WorkBaseInfoCardData'

export const WorkBaseInfoStudent = () => {
    return (
        <div
            data-aos="fade-right"
            className="relative w-[95%] h-auto lg:h-[335px] bg-no-repeat"
            style={{
                border: '10px solid transparent',
                borderImage:
                    'url(/images/site/services/webbasetraining/updatedBorder.png) 12 round',
            }}
        >
            <div className="flex items-center h-full gap-x-20 py-6 lg:py-0 px-2 lg:px-16">
                <div className="hidden lg:block w-[490px] relative h-full py-6 pl-10">
                    <Image
                        src={
                            '/images/site/services/webbasetraining/student1.png'
                        }
                        alt={''}
                        width={255}
                        height={184}
                        className="rounded-[10px]"
                    />
                    <Image
                        src={
                            '/images/site/services/webbasetraining/student2.png'
                        }
                        alt={''}
                        width={194}
                        height={139}
                        className="rounded-[10px] absolute right-0 top-1/2 -translate-y-1/2"
                    />
                    <Image
                        src={
                            '/images/site/services/webbasetraining/student3.png'
                        }
                        alt={''}
                        width={194}
                        height={139}
                        className="rounded-[10px] absolute bottom-6 left-20"
                    />
                </div>
                <div className="w-full lg:w-[calc(100%-490px)]">
                    <WorkBaseInfoCardData title="Students">
                        <span>
                            At the heart of our program are the students,
                            Excited to commence their professional endeavours.
                            We understand that theoretical knowledge alone is
                            insufficient in today's competitive job market.
                            Therefore, we provide students with invaluable
                            hands-on experience through work-based training
                            (WBT). By engaging themselves in real-world
                            settings, students gain practical skills and
                            insights that complement their academic learning,
                            enhancing their employability and confidence.
                        </span>
                        <span>
                            Our diverse range of WBT placements in fields such
                            as Commercial Cookery and Hospitality, Disability
                            and Ageing Support, Early Childhood Education and
                            Care, Individual Support, Mental Health, Allied
                            Health Assistance, School-Based Education Support,
                            Nursing, and Youth Work, caters to the varied
                            interests and career aspirations of students.
                            Whether they aspire to become chefs, nurses,
                            educators, or support workers, our program offers
                            tailored opportunities to explore and excel in their
                            chosen fields.
                        </span>
                    </WorkBaseInfoCardData>
                </div>
            </div>
        </div>
    )
}

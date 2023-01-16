import Image from 'next/image'

interface AssessmentResultCardProps {
    status: string
    assessedBy: string
}

export const AssessmentResultCard = ({
    status,
    assessedBy,
}: AssessmentResultCardProps) => {
    return (
        <div className="bg-gradient-to-r from-[#C7EF26] to-[#18B657] flex justify-between items-center rounded-2xl px-4">
            <div className="py-2">
                <p className="text-white font-medium text-sm leading-5">
                    Assessment Result
                </p>
                <h1 className="text-white font-semibold text-lg leading-7">
                    {status}
                </h1>
                <p className="text-[#480B70] font-medium text-sm leading-5">
                    {assessedBy}
                </p>
            </div>
            <div className="animate-float">
                <Image
                    src={'/images/card-icons/ic_assessment.png'}
                    width={100}
                    height={100}
                    alt=""
                />
            </div>
        </div>
    )
}

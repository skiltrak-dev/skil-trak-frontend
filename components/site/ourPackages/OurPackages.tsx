import { useEffect, useState } from 'react'
import { OurPackage } from './OurPackage'
import { Typography } from '@components/Typography'
import { PackagesDetail } from '@partials/frontPages'

export const SkiltrakPackages = [
    {
        content: 'Placement Management Portal',
        manage: 'Do it yourself',
        price: 'From $7/month (Per User)',
        color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
        textColor: 'text-[#6BB8FF]',
    },
    {
        content: 'The Startup Package',
        manage: 'We Get It Going',
        price: 'From $175/student',
        color: 'bg-gradient-to-b from-[#EC8D12] to-[#E95616]',
        textColor: 'text-[#F9AE97]',
    },
    {
        content: 'The Complete Package',
        manage: 'We Do It All',
        price: 'From $375/student Applies for STI courses only',
        color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
        textColor: 'text-[#6BB8FF]',
    },
]
export const OurPackages = () => {
    const [selectedPackage, setSelectedPackage] = useState(-1)
    const [isDone, setIsDone] = useState<boolean>(false)

    useEffect(() => {
        if (selectedPackage > 0) {
            setTimeout(() => {
                setIsDone(true)
            }, 1000)
        } else {
            setTimeout(() => {
                setIsDone(false)
            }, 1000)
        }
    }, [selectedPackage])

    return (
        <div className="py-8 px-4 md:py-[72px]">
            <div className="flex justify-center mb-4">
                <Typography variant="h2">Our Packages</Typography>
            </div>

            <div
                className={`${
                    selectedPackage > 0 ? 'opacity-100 delay-1000' : 'opacity-0'
                } transition-all duration-1000 ${!isDone ? 'hidden' : 'block'}`}
            >
                <PackagesDetail
                    onClick={() => {
                        setSelectedPackage(-1)
                    }}
                    setSelectedPackage={(val: any) => {
                        setSelectedPackage(val)
                    }}
                    selectedPackage={selectedPackage}
                />
            </div>

            <div
                className={`${
                    selectedPackage > 0 ? 'opacity-0' : 'opacity-100 delay-1000'
                } ${
                    isDone ? 'hidden' : 'block'
                } transition-all duration-1000 max-w-7xl mx-auto flex flex-col md:flex-row gap-y-8 md:gap-x-12 md:justify-center md:items-center px-0 md:px-36`}
            >
                {SkiltrakPackages.map((pack, index) => (
                    <OurPackage
                        key={index}
                        content={pack.content}
                        manage={pack.manage}
                        price={pack.price}
                        color={pack.color}
                        textColor={pack.textColor}
                        onClick={() => {
                            setSelectedPackage(index + 1)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

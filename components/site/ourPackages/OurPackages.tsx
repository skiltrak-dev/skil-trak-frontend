import { useEffect, useState } from 'react'
import { OurPackage } from './OurPackage'
import { Typography } from '@components/Typography'
import { PackagesDetail } from '@partials/frontPages'

export const SkiltrakPackages = [
    {
        title: 'Placement Management Portal',
        tagline: 'Do it yourself',
        price: 'From $7/month (Per User)',
        color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
        textColor: 'text-[#6BB8FF]',
        nextButton: 'The Start up',
    },
    {
        title: 'The Startup Package',
        tagline: 'We Get It Going',
        price: 'From $175/student',
        color: 'bg-gradient-to-b from-[#EC8D12] to-[#E95616]',
        textColor: 'text-[#F9AE97]',
        prevButton: 'Placement',
        nextButton: 'The Complete',
    },
    {
        title: 'The Complete Package',
        tagline: 'We Do It All',
        price: 'From $375/student Applies for STI courses only',
        color: 'bg-gradient-to-b from-[#094D8C] to-[#06345E]',
        textColor: 'text-[#6BB8FF]',
        prevButton: 'The Start up',
    },
]
export const OurPackages = () => {
    const [selectedPackage, setSelectedPackage] = useState(-1)
    const [isSelectedPackage, setIsSelectedPackage] = useState<boolean>(false)//


    useEffect(() => {
        if (selectedPackage > 0) {
            setTimeout(() => {
                setIsSelectedPackage(true)
            }, 1000)
        } else {
            setTimeout(() => {
                setIsSelectedPackage(false)
            }, 1000)
        }
    }, [selectedPackage])

    return (
        <>
            <div className=" mt-16 mb-4 flex justify-center">
                <Typography variant="h2">Our Packages</Typography>
            </div>

            {isSelectedPackage && (
                <div
                    className={`${
                        selectedPackage > 0
                            ? 'opacity-100 delay-1000'
                            : 'opacity-0'
                    } transition-all duration-1000`}
                >
                    <PackagesDetail
                        setSelectedPackage={(val: any) => {
                            setSelectedPackage(val)
                        }}
                        selectedPackage={selectedPackage}
                    />
                </div>
            )}

            {!isSelectedPackage && (
                <div
                    className={`${
                        selectedPackage > 0
                            ? 'opacity-0'
                            : 'opacity-100 delay-1000'
                    }  transition-all duration-1000 max-w-7xl mx-auto flex flex-col md:flex-row gap-y-8 md:gap-x-12 md:justify-center items-center px-4 md:px-36`}
                >
                    {SkiltrakPackages.map((pack, index) => (
                        <OurPackage
                            key={index}
                            title={pack.title}
                            tagline={pack.tagline}
                            price={pack.price}
                            color={pack.color}
                            textColor={pack.textColor}
                            onClick={() => {
                                setSelectedPackage(index + 1)
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

import { Typography } from '@components'
import { SiteLayout } from '@layouts'
import { MoreAboutCard } from '@partials/frontPages'
import { ListToggle } from '@partials/frontPages/privacyPolicy/components/ListToggle'
import { ListToggleData } from '@partials/frontPages/privacyPolicy/components/data'
import type { NextPage } from 'next'
import { useState } from 'react'
import {
    AiFillSetting,
    AiOutlineFileProtect,
    AiOutlineGlobal,
} from 'react-icons/ai'
import {
    BsClipboardDataFill,
    BsFillDatabaseFill,
    BsLockFill,
} from 'react-icons/bs'

import { FaTimes } from 'react-icons/fa'
import { FcBiotech } from 'react-icons/fc'
import { IoIosLaptop } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'

const privacyDescription = () => {
    return (
        <div className="pad-outer">
            <div className="pad-inner">
                <button className="x active">
                    <span className="glyph button-tr" aria-hidden="true"></span>
                </button>

                <div className="bucket-content cms-content">
                    <p>
                        <strong>Controller</strong>&nbsp;
                    </p>
                    <p>
                        Which eBay Affiliate is responsible for the collection
                        and processing of your personal data in connection with
                        the provision of the Services depends on how you use our
                        Services.
                    </p>
                    <p>
                        <strong>
                            Use of the Services (except payment services for
                            sellers)
                        </strong>
                    </p>
                    <p>
                        Depending on the region in which you reside, one of the
                        following eBay Affiliates is responsible for the
                        collection and processing of your personal data in
                        connection with the provision of our Services (except
                        payment services for sellers):
                    </p>
                    <ul>
                        <li>
                            <strong>USA</strong>: eBay Inc., 2025 Hamilton
                            Avenue, San Jose, CA 95125, USA
                        </li>
                        <li>
                            <strong>Canada</strong>: eBay Canada Limited, 240
                            Richmond Street West, 2nd Floor Suite 02-100
                            Toronto, Ontario, M5V 1V6 Canada
                        </li>
                        <li>
                            <strong>EU</strong>: eBay GmbH, Albert-Einstein-Ring
                            2-6, 14532 Kleinmachnow, Germany.
                        </li>
                        <li>
                            <strong>United Kingdom</strong>: eBay (UK) Limited,
                            1 More London Place, London, SE1 2AF, United Kingdom
                        </li>
                        <li>
                            <strong>India</strong>: eBay Singapore Services
                            Private Limited, 10 Collyer Quay, #10-01 Ocean
                            Financial Centre, Singapore 049315
                        </li>
                        <li>
                            <strong>For all other countries</strong>: eBay
                            Marketplaces GmbH, Helvetiastrasse 15/17, 3005 Bern,
                            Switzerland
                        </li>
                    </ul>
                    <p>
                        <strong>Use of the payment services for sellers</strong>
                    </p>
                    <p>
                        Depending on the region in which you reside or where
                        your payments are processed, the following eBay
                        Affiliates are responsible for the collection and
                        processing of your personal data in connection with the
                        C:\Users\SAAD\Desktop\asd.html provision of our payment
                        services to sellers:
                    </p>
                    <ul>
                        <li>
                            <strong>USA</strong>: eBay Commerce Inc., 2065
                            Hamilton Ave., San Jose, CA 95125, USA
                        </li>
                        <li>
                            <strong>EEA/CH</strong>: eBay S.à r.l., 22-24
                            Boulevard Royal, L-2449 Luxembourg
                        </li>
                        <li>
                            <strong>UK</strong>:&nbsp;eBay Commerce UK Ltd., 1
                            More London Place, London SE1 2AF, United Kingdom
                        </li>
                        <li>
                            <strong>Canada</strong>:&nbsp;eBay Commerce Canada
                            Limited, 44 Chipman Hill, Suite 1000, Saint
                            John&nbsp;NB E2L 2A9, Canada
                        </li>
                        <li>
                            <strong>Australia</strong>:&nbsp;eBay Commerce
                            Australia Pty. Ltd., Level 18, 1 York Street, Sydney
                            NSW 2000, Australia
                        </li>
                        <li>
                            <strong>Singapore</strong>: eBay Commerce Singapore
                            Private Limited, 1 Raffles Quay, #18-00, Singapore
                            048583, Singapore
                        </li>
                        <li>
                            <strong>For all other countries</strong>: eBay
                            Commerce Inc., 2065 Hamilton Ave., San Jose, CA
                            95125, USA
                        </li>
                    </ul>
                    <p>
                        As described in our&nbsp;
                        <a href="https://pages.ebay.com/payment/2.0/terms.html">
                            Payments Terms of Use
                        </a>
                        ,&nbsp;your personal data may be processed by one or
                        more of these entities depending on your location and
                        the eBay website on which a user completes a transaction
                        with you.
                    </p>
                </div>
            </div>
        </div>
    )
}

const description = privacyDescription()

const privacyData = [
    {
        title: 'Controller',
        Icon: MdSettings,
        description,
    },
    {
        title: 'Data protection officer and contact',
        Icon: AiOutlineFileProtect,
        description,
    },
    {
        title: 'What personal data we collect and process',
        Icon: BsClipboardDataFill,
        description,
    },
    {
        title: 'Purposes and legal basis for data processing and categories of recipients',
        Icon: AiFillSetting,
        description,
    },
    {
        title: 'International data transfers',
        Icon: AiOutlineGlobal,
        description,
    },
    {
        title: 'Storage duration and erasure',
        Icon: BsFillDatabaseFill,
        description,
    },
    {
        title: 'Rights as a data subject',
        Icon: IoIosLaptop,
        description,
    },
    {
        title: 'Cookies & similar technologies',
        Icon: FcBiotech,
        description,
    },
    {
        title: 'Data security',
        Icon: BsLockFill,
        description,
    },
]

// const rowClass = (i: number) => {
//     return `row-start-${Math.ceil((i + 1) / 3 + 1)}`
// }

const PrivacyPolicy: NextPage = () => {
    const [first, setfirst] = useState<number | null>(null)

    const isMobile = useMediaQuery({ maxWidth: 639 })
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 769 })

    const columnDivisible = isMobile ? 1 : isTablet ? 2 : 3
    return (
        <SiteLayout title="Privacy Policy">
            <div className="bg-gray-100 py-10">
                <Typography variant={'h3'} center>
                    Privacy Notice
                </Typography>
                <div className="max-w-3xl mx-auto mt-5 px-2 xl:px-0">
                    <Typography center color={'text-gray-600'}>
                        <span className="text-base md:text-lg font-light">
                            In our User Privacy Notice we have compiled all
                            essential information about our handling of your
                            personal data and your corresponding rights. This
                            User Privacy Notice is effective from March 24,
                            2023.
                        </span>
                    </Typography>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto mt-10 px-2 xl:px-0">
                    {privacyData?.map((privacy, i) => (
                        <>
                            <div
                                onClick={() => {
                                    setfirst((preVal) =>
                                        preVal === i + 1 ? null : i + 1
                                    )
                                }}
                                className={`${
                                    first === i + 1
                                        ? 'bg-white'
                                        : !first
                                        ? 'bg-white'
                                        : 'bg-gray-200'
                                } transition-all duration-200 group flex flex-col cursor-pointer w-full h-60 border border-gray-100 justify-center items-center px-16`}
                            >
                                {privacy?.Icon && (
                                    <privacy.Icon className="text-6xl text-gray-500 group-hover:text-[#ea7e3f] transition-all duration-200" />
                                )}
                                <Typography variant={'label'} center>
                                    <div className="text-lg font-extralight group-hover:text-[#ea7e3f] transition-all">
                                        {privacy.title}
                                    </div>
                                </Typography>
                            </div>
                            {first === i + 1 && (
                                <div
                                    className={`h-auto p-10 w-full transition-all col-start-1 col-span-1 sm:col-span-2 md:col-span-3 bg-white relative`}
                                    style={{
                                        gridRowStart: Math.ceil(
                                            (i + 1) / columnDivisible + 1
                                        ),
                                    }}
                                >
                                    <FaTimes
                                        className="absolute top-5 right-5 cursor-pointer text-xl"
                                        onClick={() => {
                                            setfirst(null)
                                        }}
                                    />
                                    {i}
                                    {privacy.description}
                                </div>
                            )}
                            {/* <div
                            className={`${
                                first === i
                                    ? 'h-20 overflow-hidden p-10 w-full'
                                    : 'h-0 overflow-hidden w-0'
                            } transition-all col-span-3  bg-white relative`}
                        >
                            {privacy.description}
                        </div> */}
                        </>
                    ))}
                </div>

                {/* toggles */}
                <div className="max-w-6xl mx-auto mt-10 px-2 xl:px-0">
                    <div className="flex flex-col gap-y-1">
                        {ListToggleData.map((list, i) => (
                            <ListToggle key={i} list={list} />
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-10 px-2 xl:px-0">
                    <Typography variant={'title'} center>
                        More About Privacy
                    </Typography>

                    <div className="flex items-center flex-col md:flex-row justify-between gap-x-10 gap-y-5 mt-7">
                        <MoreAboutCard />
                        <MoreAboutCard variant={'light'} />
                    </div>
                </div>
            </div>
        </SiteLayout>
    )
}

export default PrivacyPolicy

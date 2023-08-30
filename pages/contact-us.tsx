import React, { useState, useRef, useEffect } from 'react'
import { SiteLayout } from '@layouts'
import Image from 'next/image'

import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
    FaPhoneAlt,
} from 'react-icons/fa'

import { FcPhoneAndroid, FcAddressBook, FcFeedback } from 'react-icons/fc'

import { Heading } from '../components/site/Heading'
import { Button } from '../components/site/Button'
import { TextArea, TextInput, Typography } from '@components'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { ContactUs } from '@components/site/ContactUs'

const Page = ({ location }: any) => {
    const [scrollTo, setScrollTo] = useState(location?.state?.scorllToForm)
    const refs = useRef<any>([])

    const socialButtonClass =
        'mx-4 text-xl transition-all duration-300 transform hover:scale-125  text-gray-400'

    useEffect(() => {
        if (scrollTo && refs && refs.current) {
            refs.current[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            refs.current[1].focus()
        }

        return () => {
            setScrollTo(false)
        }
    }, [])

    return (
        <SiteLayout title={'Features'}>
            {/* <div>
                <div className="relative">
                    <Image
                        src={'/images/site/features_hero.png'}
                        alt=""
                        width={0}
                        height={0}
                        sizes={'100vw'}
                        className={'w-full'}
                    />
                    <div className="bg-black w-full h-full absolute top-0 left-0 opacity-60 z-0"></div>
                    <div className="text-white absolute top-2/4 w-11/12 md:w-3/5 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
                        <h3 className="font-bold text-2xl md:text-4xl text-center">
                            GET IN TOUCH WITH SKILTRAK
                        </h3>
                        <p className="text-md md:text-2xl text-center mt-4">
                            We have knowledgeable and friendly professionals
                            available to schedule an appointment or answer any
                            questions you may have in relation to Work Placement
                            . Call us today!
                        </p>
                    </div>
                </div>
            </div> */}
            <div className="h-96 bg-gradient-to-r from-[#0a56b0] to-[rgba(52, 91, 135, 0)] w-full">
                <div className="h-full max-w-3xl mx-auto flex flex-col justify-center items-center">
                    <Typography variant={'h1'} color="text-white">
                        GET IN TOUCH WITH SKILTRAK
                    </Typography>
                    <Typography
                        variant={'subtitle'}
                        color={'text-white'}
                        center
                    >
                        We have knowledgeable and friendly professionals
                        available to schedule an appointment or answer any
                        questions you may have in relation to Work Placement .
                        Call us today!
                    </Typography>
                </div>
            </div>
            {/* <div className="w-11/12 md:w-8/12 mx-auto my-16">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="w-full md:w-6/12">
                        <Heading text={'Get in Touch with us!'} />
                        <div className="my-8 text-gray-500">
                            <p>
                                An easy approach to the industry with a
                                professional team that has been put together to
                                lead you to your career goals. SkilTrak prepares
                                you from the beginning of your job path, from
                                the design of a strong CV, interview tips and
                                role plays to your first day in the industry.
                            </p>
                        </div>

                        <div className="flex">
                            <a
                                href="#"
                                className={`${socialButtonClass} hover:text-blue-500`}
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className={`${socialButtonClass} hover:text-blue-800`}
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="#"
                                className={`${socialButtonClass} hover:text-blue-400`}
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className={`${socialButtonClass} hover:text-yellow-500`}
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-5/12">
                        <form
                            className="my-5"
                            ref={(element) => {
                                refs.current[0] = element
                            }}
                        >
                            <div className="">
                                <div className="mb-4">
                                    <input
                                        name="name"
                                        className="
                  block
                  px-4
                  py-3
                  rounded-md
                  focus:outline-none
                  focus:ring-1
                  focus:ring-blue-900
                  focus:ring-opacity-50
                  shadow-lg
                  w-full
                  "
                                        type="text"
                                        placeholder="Name"
                                        ref={(element) => {
                                            refs.current[1] = element
                                        }}
                                        // value={email}
                                        // onChange={handleEmail}
                                    />
                                </div>

                                <div className="mb-4">
                                    <input
                                        name="email"
                                        className="
                  block
                  px-4
                  py-3
                  rounded-md
                  focus:outline-none
                  focus:ring-1
                  focus:ring-blue-900
                  focus:ring-opacity-50
                  shadow-lg
                  w-full
                  "
                                        type="email"
                                        placeholder="Email"
                                        // value={email}
                                        // onChange={handleEmail}
                                    />
                                </div>

                                <div className="mb-4">
                                    <textarea
                                        name="message"
                                        className="
                  block
                  px-4
                  py-3
                  rounded-md
                  focus:outline-none
                  focus:ring-1
                  focus:ring-blue-900
                  focus:ring-opacity-50
                  shadow-lg
                  w-full
                  resize-none
                  "
                                        rows={6}
                                        placeholder="Message"
                                        // value={email}
                                        // onChange={handleEmail}
                                    ></textarea>
                                </div>
                            </div>

                            <Button
                                text="Submit"
                                className="px-8 w-3/5 block"
                                type={'submit'}
                                // isLoading={isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-8/12 mx-auto my-8">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="shadow-md bg-white p-8 w-48 h-48 text-center mb-8">
                        <FcPhoneAndroid size={64} className="mx-auto" />
                        <p className="mt-2">
                            <strong>Phone</strong>
                        </p>
                        <a href="#"> 03-9363-6378</a>
                    </div>

                    <div className="shadow-md bg-white p-8 w-48 h-48 text-center mb-8">
                        <FcAddressBook size={64} className="mx-auto" />
                        <p className="mt-2">
                            <strong>Address</strong>
                        </p>
                        <a href="#" className="text-sm">
                            {' '}
                            Melbourne, Vic, Australia 3000
                        </a>
                    </div>

                    <div className="shadow-md bg-white p-8 w-48 h-48 text-center mb-8">
                        <FcFeedback size={64} className="mx-auto" />
                        <p className="my-4">
                            <strong>Email Us</strong>
                        </p>
                        <a href="#">info@skiltrak.com.au</a>
                    </div>
                </div>
            </div> */}
            <ContactUs />

            <div className="map w-full h-60 mx-auto bg-white">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d367336.84738445684!2d144.80684022100706!3d-37.831360359022796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2snl!4v1624881761467!5m2!1sen!2snl"
                    className="w-full h-60"
                    loading="lazy"
                ></iframe>
            </div>
        </SiteLayout>
    )
}

export default Page

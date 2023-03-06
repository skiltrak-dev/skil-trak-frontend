import React from 'react'

import { Wrapper } from './wrapper'

import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

export const Footer = () => {
    return (
        <footer>
            <div className="footer-content bg-primary">
                <Wrapper>
                    <div className="row flex flex-col lg:flex-row justify-between">
                        <div className="col w-full lg:w-35/100">
                            <div className="quick-links text-center">
                                <p
                                    className="
                          footer-heading-1
                          text-white text-lg
                          pb-4
                          border-b-2 border-white
                          inline-block
                          font-semibold
                        "
                                >
                                    Quick Links
                                </p>
                                <ul className="my-8 text-center">
                                    <li className="mb-2 text-white">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="mb-2 text-white">
                                        <Link href="/features">Features</Link>
                                    </li>
                                    <li className="mb-2 text-white">
                                        <Link href="/about-us">About Us</Link>
                                    </li>
                                    <li className="mb-2 text-white">
                                        <Link href="/contact-us">Contact Us</Link>
                                    </li>
                                    <li className="mb-2 text-white">
                                        <Link href="/terms-and-conditions">
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-text">
                                <p
                                    className="
                          footer-heading-2
                          text-lg
                          font-semibold
                          text-white
                          mb-3
                        "
                                >
                                    JOIN THE JOURNEY OF PASSION AND FULFILMENT
                                </p>

                                <p className="text-secondary">
                                    An easy approach to the industry with a
                                    professional team that has been put together
                                    to lead you to your career goals. SkilTrak
                                    prepares you from the beginning of your job
                                    path, from the design of a strong CV,
                                    interview tips and role plays to your first
                                    day in the industry.
                                </p>
                            </div>
                        </div>

                        <div className="col w-full lg:w-30/100 mt-8">
                            <p
                                className="
                        footer-heading-2
                        text-lg
                        font-semibold
                        text-white
                        mb-3
                      "
                            >
                                KEEP UP WITH UPCOMING SHORT COURSES, COURSES,
                                NEWS AND EVENTS.
                            </p>

                            <div className="form-input">
                                <form action="#" method="post">
                                    <label
                                        htmlFor="subscription-email"
                                        className="text-theme-secondary mb-2 block"
                                    >
                                        Enter your email address
                                    </label>
                                    <div
                                        className="
                            input-group
                            bg-white
                            flex
                            overflow-hidden
                            rounded-lg
                          "
                                    >
                                        <input
                                            className="flex-grow px-3"
                                            type="email"
                                            id="subscription-email"
                                            name="email"
                                            placeholder="Your email here"
                                        />
                                        <button className="bg-secondary uppercase text-white p-3">
                                            Submit
                                        </button>
                                    </div>
                                </form>

                                <div
                                    className="
                          social-buttons
                          hidden
                          lg:flex
                          justify-between
                          mt-14
                        "
                                >
                                    <Link
                                        href="https://twitter.com/SkilTrak"
                                        target="_blank"
                                        rel="noopener"
                                        className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                    >
                                        <FaTwitter className="text-white text-primary" />
                                    </Link>
                                    <Link
                                        href="https://www.facebook.com/skiltrak.com.au"
                                        target="_blank"
                                        rel="noopener"
                                        className="bg-secondary flex justify-center items-center w-11 h-11 rounded-full"
                                    >
                                        <FaFacebook className="text-white text-primary" />
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/company/skiltrak"
                                        target="_blank"
                                        rel="noopener"
                                        className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                    >
                                        <FaLinkedinIn className="text-white text-primary" />
                                    </Link>
                                    <Link
                                        href="https://www.instagram.com/skiltrak/"
                                        target="_blank"
                                        rel="noopener"
                                        className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                    >
                                        <FaInstagram className="text-white text-primary" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col w-full lg:w-25/100 lg:mt-0 mt-8">
                            <div className="address text-center">
                                <p
                                    className="
                          footer-heading-2
                          text-lg
                          font-semibold
                          text-white
                          mb-3
                        "
                                >
                                    Address
                                </p>

                                <ul className="mt-3 text-white text-center lg:text-left">
                                    <li className="mb-3">
                                        <p>
                                            <i
                                                className="
                                fas
                                fa-map-marker-alt
                                text-theme-secondary
                                mr-3
                              "
                                            ></i>
                                            Melbourne, Vic, Australia 3000
                                        </p>
                                    </li>
                                    <li className="mb-3">
                                        <p>
                                            <i className="fas fa-phone-alt text-theme-secondary mr-3"></i>
                                            03-9363-6378
                                        </p>
                                    </li>
                                    <li className="mb-3">
                                        <p>
                                            <i className="fas fa-envelope text-theme-secondary mr-3"></i>
                                            info@skiltrak.com.au
                                        </p>
                                    </li>
                                </ul>

                                <div
                                    className="
                          map
                          w-48
                          h-48
                          mx-auto
                          bg-white
                          rounded-full
                          overflow-hidden
                        "
                                >
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d367336.84738445684!2d144.80684022100706!3d-37.831360359022796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2snl!4v1624881761467!5m2!1sen!2snl"
                                        className="w-48 h-48"
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>

                            <div
                                className="
                social-buttons lg:hidden flex justify-between mt-14
                        "
                            >
                                <Link
                                    href="https://twitter.com/SkilTrak"
                                    target="_blank"
                                    rel="noopener"
                                    className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                >
                                    <FaTwitter className="text-primary" />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/skiltrak.com.au"
                                    target="_blank"
                                    rel="noopener"
                                    className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                >
                                    <FaFacebook className="text-primary" />
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/company/skiltrak"
                                    rel="noopener"
                                    className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                >
                                    <FaLinkedinIn className="text-primary" />
                                </Link>
                                <Link
                                    href="https://www.instagram.com/skiltrak/"
                                    target="_blank"
                                    rel="noopener"
                                    className="
                            bg-secondary
                            flex
                            justify-center
                            items-center
                            w-11
                            h-11
                            rounded-full
                          "
                                >
                                    <FaInstagram className="text-primary" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
            <div className="footer-bottom-line bg-primary-dark p-2">
                <p className="text-gray-300 text-sm text-center">
                    SkilTrak - All Rights Reserved ©
                    <script>document.write(new Date().getFullYear());</script>
                </p>
            </div>
        </footer>
    )
}

import React, { useEffect, useState } from 'react'
import { NavLink2 } from './NavLink2'
import { Button } from '@components/buttons'
import { useRouter } from 'next/router'

const links = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Features',
        url: '/features',
    },
    {
        text: 'Blogs',
        url: '/blogs',
    },
    {
        text: 'About Us',
        url: '/about-us',
    },
    {
        text: 'Contact Us',
        url: '/contact-us',
    },
    {
        text: 'Login',
        // url: "/login",
        // url: 'https://www.skiltrak.com.au/login',
        url: '/auth/login',
        asButton: true,
        external: true,
    },
]

export function Navbar2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [navLinks, setNavlinks] = useState(links)
    const router = useRouter()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const [show, setShow] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    const [prevScrollPosition, setPrevScrollPosition] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('')

    const handleScroll = () => {
        const currentPosition = window.pageYOffset
        setScrollPosition(currentPosition)

        if (currentPosition > prevScrollPosition) {
            // Scrolled down
            setScrollDirection('down')
            setShow(true)
        } else if (currentPosition < prevScrollPosition) {
            // Scrolled up
            setScrollDirection('up')
            setShow(false)
        }

        setPrevScrollPosition(currentPosition)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPosition])

    return (
        // <nav className={`md:active-nav ${show && 'hidden-nav'}`}>
        <nav className='shadow-sm border-b'>
            <div className="w-full mx-auto md:px-6 lg:px-[140px]">
                <div className="relative max-w-7xl mx-auto flex items-center justify-between h-20 ">
                    <div className="px-4 md:px-0 flex-1 flex items-center justify-between md:items-end md:justify-start">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src={'/images/site/logo-light.png'}
                                alt="Skiltrak Logo"
                            />
                            <img
                                className="hidden lg:block h-12 w-auto"
                                src={'/images/site/logo-light.png'}
                                alt="Skiltrak Logo"
                            />
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
                            <div className="">
                                <button
                                    type="button"
                                    onClick={toggleMenu}
                                    className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    p-2
                                    rounded-md
                                    text-gray-400
                                    hover:text-white hover:bg-amber-500 
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-inset
                                    focus:ring-white
                                    "
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>

                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>

                                    <svg
                                        className="hidden h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="pr-4">
                                <Button
                                    text={'Login'}
                                    variant="primary"
                                    onClick={() => {
                                        router.push('/auth/login')
                                    }}
                                />
                            </div>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:block md:ml-auto">
                            <div className="flex md:items-center">
                                {navLinks.map((link, i) => (
                                    <NavLink2
                                        key={i}
                                        to={link.url}
                                        text={link.text}
                                        asButton={link.asButton}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute
                inset-y-0
                right-0
                flex
                items-center
                pr-2
                md:static md:inset-auto md:ml-6 md:pr-0
              "
                    >
                        <div className="ml-3 relative hidden">
                            <div>
                                <button
                                    type="button"
                                    className="
                      bg-gray-800
                      flex
                      text-sm
                      rounded-full
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-offset-gray-800
                      focus:ring-white
                    "
                                    id="user-menu-button"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    {/* <img
                    className="h-8 w-8 rounded-full"
                    src=""
                    alt=""
                  /> */}
                                </button>
                            </div>

                            <div
                                className="
                    origin-top-right
                    absolute
                    right-0
                    mt-2
                    w-48
                    rounded-md
                    shadow-lg
                    py-1
                    bg-white
                    ring-1 ring-black ring-opacity-5
                    focus:outline-none
                  "
                                role="menu"
                            >
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    id="user-menu-item-0"
                                >
                                    Your Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    id="user-menu-item-1"
                                >
                                    Settings
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    id="user-menu-item-2"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`  ${
                    isMenuOpen ? 'h-full' : 'h-0'
                } transition-all overflow-hidden duration-300 ease-in-out md:hidden`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
                    {navLinks.map((link, i) => (
                        <NavLink2
                            key={i}
                            to={link.url}
                            text={link.text}
                            asButton={link.asButton}
                        />
                    ))}
                </div>
            </div>
        </nav>
    )
}

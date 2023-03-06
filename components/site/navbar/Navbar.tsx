import React, { useEffect, useState } from 'react'

import { NavLink } from './NavLink'

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
        text: 'About Us',
        url: '/about-us',
    },
    {
        text: 'Contact Us',
        url: '/contact-us',
    },
    {
        text: 'Login/Signup',
        // url: "/login",
        // url: 'https://www.skiltrak.com.au/login',
        url: '/auth/login',
        asButton: true,
        external: true,
    },
]

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [navLinks, setNavlinks] = useState(links)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // useEffect(() => {
    //   const userCreds = JSON.parse(localStorage.getItem("skiltrak-creds"));
    //   const isDashboardExists = navLinks.filter(
    //     (link) => link.text !== "Dashboard"
    //   ).length;

    //   if (userCreds.token && !isDashboardExists) {
    //     let clonedLinks = [...navLinks];
    //     clonedLinks = clonedLinks.filter((link) => link.url !== "/login");
    //     clonedLinks.push({
    //       text: "Dashboard",
    //       url: "https://staging.toddsgroup.com/dashboard",
    //       // url: "https://skiltrak.com/login",
    //       asButton: true,
    //       external: true,
    //     });
    //     setNavlinks(clonedLinks);
    //   }
    // }, []);

    return (
        <nav className="bg-sky-900">
            <div className="w-full mx-auto md:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
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
                                    hover:text-white hover:bg-gray-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-inset
                                    focus:ring-white
                                    "
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>

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
                    <div
                        className="
                flex-1 flex
                items-center
                justify-center
                md:items-stretch md:justify-start
              "
                    >
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src={'/images/site/logo_light.png'}
                                alt="Workflow"
                            />
                            <img
                                className="hidden lg:block h-8 w-auto"
                                src={'/images/site/logo_light.png'}
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block md:ml-auto">
                            <div className="flex">
                                {navLinks.map((link, i) => (
                                    <NavLink
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
                        className="
                absolute
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
                        <NavLink
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

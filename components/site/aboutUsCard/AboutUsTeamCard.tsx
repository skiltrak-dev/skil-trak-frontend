import React from 'react'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
} from 'react-icons/fa'

export const AboutUsTeamCard = ({
    name,
    designation,
    email,
    message,
    imageUrl,
}: any) => {
    return (
        <div className="w-full md:w-1/4 mb-8 mr-8">
            <div className="rounded-xl mx-auto w-48 h-48 overflow-hidden bg-gray-300">
                <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url('${imageUrl}')`,
                    }}
                ></div>
            </div>

            <div className="text-center my-4">
                <p className="text-xl">
                    <strong>{name}</strong>
                </p>
                <p className="text-gray-400">
                    <small>{designation}</small>
                </p>
                <p>{email}</p>

                {/* <div className="mt-4 text-sm text-gray-600">{message}</div> */}
                <div
                    className="mt-4 text-xs text-gray-600"
                    dangerouslySetInnerHTML={{ __html: message }}
                ></div>
            </div>

            <div className="flex justify-center text-gray-400">
                <a href="#" className="mx-4">
                    <FaFacebookF />
                </a>
                <a href="#" className="mx-4">
                    <FaLinkedinIn />
                </a>
                <a href="#" className="mx-4">
                    <FaTwitter />
                </a>
                <a href="#" className="mx-4">
                    <FaInstagram />
                </a>
            </div>
        </div>
    )
}

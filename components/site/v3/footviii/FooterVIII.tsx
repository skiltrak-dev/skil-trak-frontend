import Image from 'next/image'
import React from 'react'
import { QuickLinks } from './QuickLinks'
import { ContactDetailsFooter } from './ContactDetailsFooter'
import { FooterAddressOnMap } from './FooterAddressOnMap'
import { Typography } from '@components/Typography'
import { SocialLinks } from './SocialLinks'

export const FooterVIII = () => {
  return (
    <div className='bg-[#F3F3F3] w-full py-8'>
        <div className="max-w-7xl mx-auto">
            <Image
                    className={'w-24 md:w-32'}
                    src={`/images/site/home-page-v3/footer/skiltrak-logo-2.svg`}
                    alt="Logo"
                    height={40}
                    width={100}
                    priority
                />
                <QuickLinks />
                <div className="flex justify-between items-center md:gap-x-12 mt-10">
                     <SocialLinks />
                <div className="space-y-4">
                    <ContactDetailsFooter />
                    <FooterAddressOnMap />
                </div>
                </div>
        </div>
    </div>
  )
}

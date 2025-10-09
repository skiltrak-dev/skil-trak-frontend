import React from 'react'

export const FooterAddressOnMap = () => {
    return (
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.950282690544!2d144.970652!3d-37.81463350000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6439f047de827%3A0x4cbc46e111d50c56!2s101%20Collins%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2s!4v1759911062853!5m2!1sen!2s"
                className="md:w-[420px] w-80 h-40 md:h-60 lg:h-72 rounded-md"
                style={{ border: '0;' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}

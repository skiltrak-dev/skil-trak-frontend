import React from 'react'
import Script from 'next/script'

export const GoogleAnalyticsScript = () => {
    return (
        <>
            <Script
                strategy="beforeInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-DT9HTH9ZKR"
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
          gtag('config', 'G-DT9HTH9ZKR');
        `,
                }}
            />
        </>
    )
}

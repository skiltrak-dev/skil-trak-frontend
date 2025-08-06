import { DisplayNotifications } from '@components'
import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import Head from 'next/head'
import Script from 'next/script'
import { useRef } from 'react'

export const SiteLayout = ({ children, title }: any) => {
    const tawkMessengerRef = useRef<any>(null)

    const handleMinimize = () => {
        tawkMessengerRef?.current?.minimize()
    }

    return (
        <div>
            <Head>
                <title>{`${title || 'Home'}`}</title>
                <meta name="description" content="SkilTrak" key="desc" />
                <Script
                    id="sa-dynamic-optimization"
                    data-uuid="d8540013-60cb-43d6-aa64-18aa360b7230"
                    src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gImQ4NTQwMDEzLTYwY2ItNDNkNi1hYTY0LTE4YWEzNjBiNzIzMCI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
                    strategy="afterInteractive"
                />
            </Head>
            <Script
                strategy="afterInteractive"
                src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
                async
            />

            <Navbar2 />
            {/* <div className="absolute z-[99999] top-0 left-0">
                <div className="flex items-center gap-x-5">
                    {' '}
                    <LottieAnimation
                        animation={Animations.Common.Snow}
                        autoplay
                        loop
                        height={500}
                        width={500}
                    />
                    <LottieAnimation
                        animation={Animations.Common.Snow}
                        autoplay
                        loop
                        height={500}
                        width={500}
                    />
                    <LottieAnimation
                        animation={Animations.Common.Snow}
                        autoplay
                        loop
                        height={500}
                        width={500}
                    />
                </div>
            </div> */}
            <DisplayNotifications />
            <main>{children}</main>
            <Footer4 />
            <div>
                <TawkMessengerReact
                    propertyId={'61b1f52ec82c976b71c091e2'}
                    widgetId={'1fmfibg61'}
                    useRef={tawkMessengerRef}
                />
            </div>
        </div>
    )
}

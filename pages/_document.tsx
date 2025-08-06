import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    id="sa-dynamic-optimization"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              var script = document.createElement("script");
              script.setAttribute("nowprocket", "");
              script.setAttribute("nitro-exclude", "");
              script.src = "https://dashboard.searchatlas.com/scripts/dynamic_optimization.js";
              script.dataset.uuid = "d8540013-60cb-43d6-aa64-18aa360b7230";
              script.id = "sa-dynamic-optimization-loader";
              document.head.appendChild(script);
            `,
                    }}
                />
                <meta
                    name="google-site-verification"
                    content="GTslJTTqv87p3WbfdzlrmIId4pMc1vNepwDTHaOWpbc"
                />
                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
                    }}
                /> */}
                {/* <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
                    />
                </noscript> */}
            </Head>
            <body>
                <Main />
                <div id="portal" />
                <NextScript />
            </body>
        </Html>
    )
}

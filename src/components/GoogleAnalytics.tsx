import Script from "next/script"

const GoogleAnalytics = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) return null

    return (
        <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', { page_path: window.location.pathname });
                    `,
                }}
            />
        </>
    )
}

export default GoogleAnalytics

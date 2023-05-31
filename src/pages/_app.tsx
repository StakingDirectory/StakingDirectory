import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from "react"

import "../styles/globals.css"

import { ChakraProvider, ColorModeScript, useColorModeValue } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

// Custom theme colors
const customTheme = extendTheme({
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#1B1B1B",
        },
        contentBackground: {
            color: {
                light: "#EDF2F7",
                dark: "#272A2F",
            },
            hoverColor: {
                light: "#E2E8F0",
                dark: "#323539",
            },
        },
    },
})

// Set the HTML background color to match the Chakra UI background color
const HtmlBackgroundColor = () => {
    const backgroundColor = useColorModeValue(customTheme.colors.pageBackground.light, customTheme.colors.pageBackground.dark)
    useEffect(() => {
        document.documentElement.style.backgroundColor = backgroundColor
    }, [backgroundColor])
    return null
}

function MyApp({ Component, pageProps }: AppProps) {
    const [isColorModeReady, setIsColorModeReady] = useState(false)
    const currentColorMode = useColorModeValue("light", "dark")

    // Wait until the color mode value is ready before showing the app
    // This stops it flashing white on load when the color mode is dark
    useEffect(() => {
        currentColorMode && setIsColorModeReady(true)
        if (isColorModeReady) {
            const appElement = document.getElementById("app")
            if (appElement) {
                appElement.classList.remove("hideUntilReady")
            }
        }
    }, [currentColorMode, isColorModeReady])

    return (
        <ChakraProvider theme={customTheme}>
            <HtmlBackgroundColor />
            <ColorModeScript initialColorMode="dark" />
            <div id="app" className="hideUntilReady">
                <Component {...pageProps} />
                <Analytics />
            </div>
        </ChakraProvider>
    )
}

export default MyApp

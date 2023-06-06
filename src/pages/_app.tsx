import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from "react"

import "../styles/globals.css"
import customTheme from "../styles/customTheme"

import { ChakraProvider, ColorModeScript, useColorModeValue } from "@chakra-ui/react"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

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

    // Use this style to stop a default blue flash on page load when dark mode is used
    // This does create a dark flash on light mode, but I don't have a better solution yet
    const style = `
      #__next {
        background-color: ${customTheme.colors.pageBackground.dark};
      }
    `

    return (
        <ChakraProvider theme={customTheme}>
            <HtmlBackgroundColor />
            <ColorModeScript initialColorMode="dark" />
            <style>{style}</style>
            <div id="app" className="hideUntilReady">
                <Component {...pageProps} />
                <Analytics />
            </div>
        </ChakraProvider>
    )
}

export default MyApp

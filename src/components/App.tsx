import { useState, useEffect } from "react"
import Header from "./Header/Header"

import { useColorModeValue, Container, Box, Flex } from "@chakra-ui/react"

const App = () => {
    const environment = process.env.NODE_ENV

    // Check if the current render is on the server (Server Side Render) or client
    const isSSR = typeof window === "undefined"

    // Rerender when window size changes and save
    // window size to state to allow conditional rendering
    const [windowSize, setWindowSize] = useState({
        width: isSSR ? 0 : window.innerWidth,
        height: isSSR ? 0 : window.innerHeight,
    })
    useEffect(() => {
        const handleResizeWindow = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow)
        window.addEventListener("load", handleResizeWindow)
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow)
            window.removeEventListener("load", handleResizeWindow)
        }
    }, [])

    return (
        <Box minH="100vh" minW="100vw" bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                {/* TODO: Don't hardcode colors */}
                <Box width="100%" borderBottom={useColorModeValue("solid 1px rgb(223 223 223)", "solid 1px rgb(51 51 51)")}>
                    <Box width="100%" px={"3rem"} maxW="1780px">
                        <Header windowSize={windowSize} environment={environment} />
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default App

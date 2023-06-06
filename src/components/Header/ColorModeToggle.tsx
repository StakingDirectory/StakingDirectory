import { Box, ButtonProps, Flex, useColorMode } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

export default function ColorModeToggle(props: ButtonProps) {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex h="100vh" justifyContent="center" alignItems="center">
            <Box
                aria-label="Toggle Color Mode"
                onClick={() => {
                    toggleColorMode()
                }}
                cursor={"pointer"}
                w={6}
            >
                {colorMode === "light" ? <FontAwesomeIcon icon={faMoon} size={"xl"} /> : <FontAwesomeIcon icon={faSun} size={"xl"} />}
            </Box>
        </Flex>
    )
}

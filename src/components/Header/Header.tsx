import { Box, Flex, HStack, useColorModeValue, Image } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import ColorModeToggle from "./ColorModeToggle"
import Link from "next/link"

export default function Header({ windowSize, environment }) {
    const isSSR = typeof window === "undefined"

    function navigateHome() {
        if (!isSSR) {
            window.history.replaceState({}, "", `${window.location.pathname}`)
            window.location.reload()
        }
    }

    return (
        <>
            <Box bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    <HStack spacing={3} alignItems={"center"}>
                        <Image
                            onClick={navigateHome}
                            sx={{ cursor: "pointer" }}
                            minW={10}
                            objectFit={"cover"}
                            src={"./EthereumLogo.svg"}
                            alt={"StakingBeat Logo"}
                        />
                        <Box pr={2} minW={40} fontWeight="bold" fontSize="xl" sx={{ cursor: "default" }}>
                            StakingBeat
                        </Box>
                    </HStack>
                    <HStack spacing={5}>
                        <Link href={"https://twitter.com/StakingBeat"} target="_blank">
                            <Box w="24px" cursor={"pointer"} aria-label={"StakingBeat Twitter Profile"}>
                                <FontAwesomeIcon icon={faTwitter} size={"xl"} />
                            </Box>
                        </Link>
                        <Link href={"https://github.com/StakingBeat/StakingBeat"} target="_blank">
                            <Box w="24px" cursor={"pointer"} aria-label={"View GitHub Source"}>
                                <FontAwesomeIcon icon={faGithub} size={"xl"} />
                            </Box>
                        </Link>
                        <ColorModeToggle />
                        <Flex alignItems={"center"}></Flex>
                    </HStack>
                </Flex>
            </Box>
        </>
    )
}

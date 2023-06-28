import { Box, Flex, HStack, Image } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"

import ColorModeToggle from "./ColorModeToggle"
import Link from "next/link"

export default function Header({}) {
    const isSSR = typeof window === "undefined"

    function navigateHome() {
        if (!isSSR) {
            window.history.replaceState({}, "", `${window.location.pathname}`)
            window.location.reload()
        }
    }

    return (
        <Box width="100%" borderBottomWidth={1} className={"borderColorDivider"}>
            <Box width="100%" px={{ base: "10px", sm: "3rem" }} maxW="1780px">
                <Box className={"bgPage"}>
                    <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                        <HStack spacing={3} alignItems={"center"}>
                            <Image
                                onClick={navigateHome}
                                sx={{ cursor: "pointer" }}
                                minW={10}
                                objectFit={"cover"}
                                src={"./StakingDirectoryLogo.svg"}
                                alt={"Staking Directory Logo"}
                            />
                            <Box pr={2} minW={30} fontWeight="extrabold" fontSize="xl" sx={{ cursor: "default" }}>
                                Staking Directory
                            </Box>
                        </HStack>
                        <HStack spacing={5}>
                            <Link href={"https://twitter.com/StakeDirectory"} target="_blank">
                                <Box w="24px" cursor={"pointer"} aria-label={"Staking Directory Twitter Profile"}>
                                    <FontAwesomeIcon icon={faTwitter} size={"xl"} />
                                </Box>
                            </Link>
                            <Link href={"https://github.com/StakingDirectory/StakingDirectory"} target="_blank">
                                <Box w="24px" cursor={"pointer"} aria-label={"View GitHub Source"}>
                                    <FontAwesomeIcon icon={faGithub} size={"xl"} />
                                </Box>
                            </Link>
                            {/* TODO: Enable light mode when I actually style it */}
                            {/* <Box borderLeftWidth={1} className={"borderColorDivider"} height={8} /> */}
                            {/* <ColorModeToggle /> */}
                        </HStack>
                    </Flex>
                </Box>
            </Box>
        </Box>
    )
}

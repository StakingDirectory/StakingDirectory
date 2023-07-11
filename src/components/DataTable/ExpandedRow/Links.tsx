import { Box, Flex, Text, Button, Link } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faCode } from "@fortawesome/free-solid-svg-icons"
import { faDiscord, faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons"

import NextLink from "next/link"

export default function Links({ provider }) {
    return (
        <Flex direction={"column"} gap={"9px"} className={"expandContentBox"} grow={0}>
            {[
                { type: "Website", icon: faLink },
                { type: "Twitter", icon: faTwitter },
                { type: "Discord", icon: faDiscord },
                { type: "Telegram", icon: faTelegram },
                { type: "Repo", icon: faCode },
            ].map((linkData) => {
                const href = provider.links?.[linkData.type.toLowerCase()]
                const button = (
                    <Button isDisabled={!href} px={0} w={"100%"} justifyContent={"start"} borderRadius={10}>
                        <Flex>
                            <Box w={10}>
                                <FontAwesomeIcon icon={linkData.icon} />
                            </Box>
                            <Text pr={5}>{linkData.type}</Text>
                        </Flex>
                    </Button>
                )
                return href ? (
                    <Link key={linkData.type} as={NextLink} href={href} target="_blank">
                        {button}
                    </Link>
                ) : (
                    <Box key={linkData.type}>{button}</Box>
                )
            })}
        </Flex>
    )
}

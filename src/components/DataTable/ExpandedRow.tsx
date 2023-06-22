import { Box, Flex, Link, Text, Button } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink, faCode } from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

import NextLink from "next/link"

import KeyOwner from "./TableCells/KeyOwner"

export default function ExpandedRow({ provider }) {
    return (
        <Flex gap={5} pt={3} pb={5}>
            <Flex direction={"column"} gap={3} className={"expandContentBox"}>
                {[
                    { type: "Website", icon: faLink },
                    { type: "Twitter", icon: faTwitter },
                    { type: "Repo", icon: faCode },
                ].map((linkData) => {
                    const href = provider.links[linkData.type.toLowerCase()]
                    return href ? (
                        <Link as={NextLink} href={href} target="_blank">
                            <Button px={0} w={"100%"} justifyContent={"start"} borderRadius={15}>
                                <Flex>
                                    <Box w={10}>
                                        <FontAwesomeIcon icon={linkData.icon} />
                                    </Box>
                                    <Text pr={5}>{linkData.type}</Text>
                                </Flex>
                            </Button>
                        </Link>
                    ) : (
                        <Button isDisabled leftIcon={<FontAwesomeIcon icon={linkData.icon} />}>
                            {linkData.type}
                        </Button>
                    )
                })}
            </Flex>
            <Flex w={300} className={"expandContentBox"}>
                <Text>🏗️ Description coming soon! 🏗️</Text>
            </Flex>
            <Flex direction={"column"} w={200} className={"expandContentBox"} gap={3}>
                <Text>Key Owner</Text>
                <Text>🏗️ Coming soon! 🏗️</Text>
                {/* <KeyOwner provider={provider} id={"validatorKey"} />
                <KeyOwner provider={provider} id={"withdrawalKey"} /> */}
            </Flex>
            <Flex grow={1} className={"expandContentBox"}>
                <Text>🏗️ Checklist coming soon! 🏗️</Text>
                {/* <Flex direction={"column"} gap={3}>
                    {["openSource", "audited", "bugBounty", "battleTested", "5", "6", "7", "8", "9"].map(() => {
                        return <Box>Indicator</Box>
                    })}
                </Flex> */}
            </Flex>
        </Flex>
    )
}

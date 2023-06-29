import { Flex, Link, Text, Box, Code } from "@chakra-ui/react"

import NextLink from "next/link"
import { borderRadius } from "polished"

export default function Footer() {
    return (
        <Flex direction={"column"} alignItems={"center"} pb={5} px={3} gap={1}>
            <Text fontWeight={"bold"}>
                Built with ❤️ by{" "}
                <Link as={NextLink} href={"https://twitter.com/EridianAlpha"} color={"blue"} textDecoration={"underline"} target="_blank">
                    Eridian
                </Link>
            </Text>
            <Flex wrap={"wrap"} justifyContent={"center"} alignItems={"baseline"} fontWeight={"bold"} gap={1}>
                Please support this project by donating to
                <Code mx={1} px={2} py={1} borderRadius={10}>
                    StakingDirectory.eth
                </Code>
                🙏
            </Flex>
        </Flex>
    )
}

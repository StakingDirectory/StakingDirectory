import { Flex, Link, Text, Code } from "@chakra-ui/react"

import NextLink from "next/link"

export default function Footer() {
    return (
        <Flex w={"100vw"} direction={"column"} alignItems={"center"} pb={5} px={3} gap={1}>
            <Text fontWeight={"bold"}>
                Built with ❤️ by{" "}
                <Link as={NextLink} href={"https://twitter.com/EridianAlpha"} color={"blue"} textDecoration={"underline"} target="_blank">
                    Eridian
                </Link>
            </Text>
            <Text fontWeight={"bold"}>
                Please support this project by donating to <Code>StakingDirectory.eth</Code> 🙏
            </Text>
        </Flex>
    )
}

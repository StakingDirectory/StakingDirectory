import { Flex, Link, Text } from "@chakra-ui/react"

import NextLink from "next/link"

export default function Footer() {
    return (
        <Flex w={"100vw"} direction={"column"} alignItems={"center"} pb={5} px={3} gap={1}>
            <Text fontWeight={"bold"}>
                Made with ❤️ by{" "}
                <Link as={NextLink} href={"https://twitter.com/EridianAlpha"} color={"blue"} textDecoration={"underline"} target="_blank">
                    Eridian
                </Link>
            </Text>
            <Text fontWeight={"bold"}>
                Please support this project by{" "}
                <Link
                    as={NextLink}
                    href={"https://etherscan.io/address/0xE3e34FA93575AF41BEF3476236E1A3CDb3F60B85"}
                    color={"blue"}
                    textDecoration={"underline"}
                    target="_blank"
                >
                    donating
                </Link>{" "}
                🙏
            </Text>
        </Flex>
    )
}

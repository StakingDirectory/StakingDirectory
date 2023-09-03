import { Flex, Text, Link, Box, Button } from "@chakra-ui/react"
import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

export default function SelfLimit({ provider }) {
    const href = provider.selfLimit?.evidenceLink
    const value = provider.selfLimit?.value

    return (
        <Flex direction={"column"} gap={3} className={"expandContentBoxSmall"}>
            <Flex direction="row" gap={3} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                <Text fontWeight={"bold"} cursor={"default"}>
                    Self-limit Commitment
                </Text>
                <Link as={NextLink} href={href ? href : ""} target="_blank">
                    <Button
                        w={"fit-content"}
                        size={"sm"}
                        justifyContent={"start"}
                        borderRadius={10}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        isDisabled={href ? false : true}
                    >
                        <Flex gap={2} justifyContent={"center"} alignItems={"center"} fontWeight={"extrabold"}>
                            {href ? (
                                <>
                                    <Text>{value}%</Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Box>
                                </>
                            ) : (
                                <Text>No limit set</Text>
                            )}
                        </Flex>
                    </Button>
                </Link>
            </Flex>
        </Flex>
    )
}

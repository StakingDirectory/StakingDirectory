import { Flex, Text, Link, Box, Button } from "@chakra-ui/react"
import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

import ratedNetworkApiData from "public/data/ratedNetworkApiData.json"

export default function SelfLimit({ provider }) {
    const selfLimitHref = provider.selfLimit?.evidenceLink
    const selfLimitValue = provider.selfLimit?.value

    const apiData = ratedNetworkApiData.filter((apiData) => apiData.id === provider.id)

    const networkShareHref = apiData ? `https://www.rated.network/o/${provider.ratedId}` : null
    const networkShareValue = apiData[0] ? Math.ceil((apiData[0] as any).networkPenetration * 1000) / 10 : null

    return (
        <Flex direction={"column"} gap={3} className={"expandContentBoxSmall"} py={"10px"}>
            <Flex direction={"row"}>
                <Flex direction="row" gap={2} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                    <Text fontWeight={"bold"} cursor={"default"} textAlign={"center"}>
                        Network <br /> Share
                    </Text>
                    <Link as={NextLink} href={networkShareHref ? networkShareHref : ""} target="_blank">
                        <Button
                            w={"fit-content"}
                            size={"sm"}
                            justifyContent={"start"}
                            borderRadius={10}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            isDisabled={apiData[0] ? false : true}
                            px={2}
                        >
                            <Flex gap={2} justifyContent={"center"} alignItems={"center"} fontWeight={"extrabold"}>
                                {apiData[0] ? (
                                    <>
                                        <Text>{networkShareValue}%</Text>
                                        <Box>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Box>
                                    </>
                                ) : (
                                    <Text>No data</Text>
                                )}
                            </Flex>
                        </Button>
                    </Link>
                </Flex>
                <Box className="borderColor" borderWidth={2} my={-3} />
                <Flex direction="row" gap={2} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                    <Text fontWeight={"bold"} cursor={"default"} textAlign={"center"}>
                        Self-limit <br /> Pledge
                    </Text>
                    <Link as={NextLink} href={selfLimitHref ? selfLimitHref : ""} target="_blank">
                        <Button
                            w={"fit-content"}
                            size={"sm"}
                            justifyContent={"start"}
                            borderRadius={10}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            isDisabled={selfLimitHref ? false : true}
                            px={2}
                        >
                            <Flex gap={2} justifyContent={"center"} alignItems={"center"} fontWeight={"extrabold"}>
                                {selfLimitHref ? (
                                    <>
                                        <Text>{selfLimitValue}%</Text>
                                        <Box>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Box>
                                    </>
                                ) : (
                                    <Text>No limit</Text>
                                )}
                            </Flex>
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    )
}

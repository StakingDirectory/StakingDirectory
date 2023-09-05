import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import ratedNetworkApiData from "public/data/ratedNetworkApiData.json"

export default function RewardFee({ provider }) {
    const apiData = ratedNetworkApiData.filter((apiData) => apiData.id === provider.id)

    return provider.stakingType === "lst" && apiData[0] && apiData[0].aprPercentage30Day ? (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={
                    <Box className={"tooltipLabel"}>
                        {provider.name} average APR
                        <br />
                        Past 30 day
                    </Box>
                }
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box borderRadius={10} w={"fit-content"} px={"8px"} py={"5px"} fontWeight={"bold"} borderWidth={2}>
                    <Text>{apiData[0].aprPercentage30Day.toFixed(1)}%</Text>
                </Box>
            </Tooltip>
        </Flex>
    ) : (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={
                    <Box className={"tooltipLabel"}>
                        Ethereum network average APR
                        <br />
                        Past 30 days
                    </Box>
                }
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Flex
                    direction={"row"}
                    alignItems={"center"}
                    gap={1}
                    borderRadius={10}
                    w={"fit-content"}
                    px={"8px"}
                    py={"5px"}
                    fontWeight={"bold"}
                    borderWidth={0}
                >
                    {ratedNetworkApiData.filter((apiData) => apiData.id === 0)[0].aprPercentage30Day.toFixed(1) + "%"}
                </Flex>
            </Tooltip>
        </Flex>
    )
}

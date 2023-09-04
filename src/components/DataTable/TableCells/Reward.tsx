import { Flex, Tooltip, Box, Text, Image } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

import ratedNetworkApiData from "public/data/ratedNetworkApiData.json"

export default function RewardFee({ provider }) {
    const apiData = ratedNetworkApiData.filter((apiData) => apiData.id === provider.id)

    return provider.stakingType === "lst" && apiData[0] && apiData[0].aprPercentage7Day ? (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={
                    <Box className={"tooltipLabel"}>
                        {provider.name} average APR
                        <br />
                        Past 7 day
                    </Box>
                }
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box borderRadius={10} w={"fit-content"} px={"8px"} py={"5px"} fontWeight={"bold"} borderWidth={2}>
                    <Text>{apiData[0].aprPercentage7Day.toFixed(1)}%</Text>
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
                        Past 7 days
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
                    {/* <Image maxW={3} objectFit={"cover"} src={"./EthereumBeaconChainLogo.svg"} alt={"Staking Directory Logo"} /> */}
                    {ratedNetworkApiData.filter((apiData) => apiData.id === 0)[0].aprPercentage7Day.toFixed(1) + "%"}
                </Flex>
            </Tooltip>
        </Flex>
    )
}

import React from "react"
import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={"Cost to use this provider"} placement={"top"} closeOnClick={false} gutter={5} className="tooltipArrow" hasArrow={true}>
                <Box borderRadius={10} border={"2px solid"} borderColor={"red"} w={"fit-content"} px={2} className={"bgPage"}>
                    {provider.fee.value}
                    {provider.fee.type == "rewardPercentage" ? "%" : ""}
                </Box>
            </Tooltip>
        </Flex>
    )
}

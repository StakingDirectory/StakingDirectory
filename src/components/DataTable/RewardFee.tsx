import React from "react"
import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={"🏗️ Reward calculation coming soon! 🏗️"} placement={"top"} closeOnClick={false}>
                <Box borderRadius={10} bg={"green"} w={"fit-content"} px={2} py={"1px"} fontWeight={"bold"} cursor={"help"}>
                    <FontAwesomeIcon icon={faGift} size={"sm"} />
                </Box>
            </Tooltip>
            {/* TODO: Make this tooltip dynamic to explain each fee */}
            <Tooltip label={"Cost to use this provider"} placement={"top"} closeOnClick={false}>
                <Box borderRadius={10} border={"2px solid red"} w={"fit-content"} px={2} cursor={"help"}>
                    {provider.fee.value}
                    {provider.fee.type == "rewardPercentage" ? "%" : ""}
                </Box>
            </Tooltip>
        </Flex>
    )
}

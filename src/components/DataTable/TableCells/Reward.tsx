import React from "react"
import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={"🏗️ Reward calculation coming soon! 🏗️"} placement={"top"} gutter={7} className="tooltipArrow" hasArrow={true}>
                <Box borderRadius={10} bg={"green"} w={"fit-content"} px={"8px"} py={"5px"} fontWeight={"bold"}>
                    <FontAwesomeIcon icon={faGift} size={"lg"} />
                </Box>
            </Tooltip>
        </Flex>
    )
}

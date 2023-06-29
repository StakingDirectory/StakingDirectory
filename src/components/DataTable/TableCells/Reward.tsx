import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={<Box className={"tooltipLabel"}>🏗️ Reward calculation coming soon! 🏗️</Box>}
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box borderRadius={10} w={"fit-content"} px={"8px"} py={"5px"} fontWeight={"bold"}>
                    <FontAwesomeIcon icon={faGift} size={"lg"} />
                </Box>
            </Tooltip>
        </Flex>
    )
}

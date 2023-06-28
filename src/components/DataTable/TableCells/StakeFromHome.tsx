import { Flex, Image, Tooltip, Box } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"

export default function StakeFromHome({ provider }) {
    const label = (
        <Box className={"tooltipLabel"}>
            {provider.stakeFromHome ? "Allows you to operator your validator from your home" : "A node operator runs the validator"}
        </Box>
    )

    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={label} placement="top" className="tooltipArrow" gutter={16} hasArrow={true}>
                <Box
                    as={FontAwesomeIcon}
                    icon={faHouseChimney}
                    size={"xl"}
                    filter={provider.stakeFromHome ? "" : "grayscale(100%)"}
                    opacity={provider.stakeFromHome ? "" : "0.2"}
                />
            </Tooltip>
        </Flex>
    )
}

import { Flex, Image, Tooltip, Box, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"

export default function StakeFromHome({ provider }) {
    const label = (
        <Box className={"tooltipLabel"}>
            {provider.stakeFromHome ? (
                <Flex direction={"column"}>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                        Yes 🥳
                    </Text>
                    <Text>Allows you to operate a validator from your home</Text>
                </Flex>
            ) : (
                <Flex direction={"column"}>
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                        No 😔
                    </Text>
                    <Text>You can't stake from home with this staking option</Text>
                </Flex>
            )}
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

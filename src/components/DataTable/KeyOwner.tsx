import React from "react"

import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding, faServer, faCode } from "@fortawesome/free-solid-svg-icons"

export default function ValidatorKeyOwner({ provider, id }) {
    const tooltipLabel = (value, color, icon) => {
        return (
            <Flex alignItems={"center"} direction="column" gap={3}>
                <Text fontSize={"md"} fontWeight={"extrabold"}>
                    {id === "validatorKey" ? "Validator keys" : "Withdrawal keys"}
                </Text>
                <Text>are controlled by the</Text>
                <Flex gap={2} color={color} alignItems="baseline">
                    <FontAwesomeIcon icon={icon} size="lg" />
                    <Text fontSize={"md"} fontWeight={"extrabold"} color={color}>
                        {value}
                    </Text>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider[id].includes("userValidator") && (
                <Tooltip label={tooltipLabel("User", "green", faUserAstronaut)} openDelay={0}>
                    <Box color="green">
                        <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                    </Box>
                </Tooltip>
            )}
            {provider[id].includes("service") && (
                <Tooltip label={tooltipLabel("Service", "gold", faBuilding)} openDelay={0}>
                    <Box color="gold">
                        <FontAwesomeIcon icon={faBuilding} size="lg" />
                    </Box>
                </Tooltip>
            )}
            {provider[id].includes("nodeOperator") && (
                <Tooltip label={tooltipLabel("Node operator", "blue", faServer)} openDelay={0}>
                    <Box color="blue">
                        <FontAwesomeIcon icon={faServer} size="lg" />
                    </Box>
                </Tooltip>
            )}
            {provider[id].includes("userWithdrawal") && (
                <Tooltip label={tooltipLabel("User", "green", faUserAstronaut)} openDelay={0}>
                    <Box color="green">
                        <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                    </Box>
                </Tooltip>
            )}
            {provider[id].includes("smartContract") && (
                <Tooltip label={tooltipLabel("Smart contract", "blue", faCode)} openDelay={0}>
                    <Box color="blue">
                        <FontAwesomeIcon icon={faCode} size="lg" />
                    </Box>
                </Tooltip>
            )}
        </Flex>
    )
}

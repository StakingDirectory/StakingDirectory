import React from "react"

import { Flex, Tooltip, Box } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faCode } from "@fortawesome/free-solid-svg-icons"

export default function WithdrawalKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5} mt={"6px"}>
            {provider.withdrawalKey.includes("userWithdrawal") && (
                <Tooltip label={"Withdrawal keys are controlled by the user"} openDelay={0}>
                    <Box color="green">
                        <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                    </Box>
                </Tooltip>
            )}
            {provider.withdrawalKey.includes("smartContract") && (
                <Tooltip label={"Withdrawal keys are controlled by a smart contract"} openDelay={0}>
                    <Box color="blue">
                        <FontAwesomeIcon icon={faCode} size="lg" />
                    </Box>
                </Tooltip>
            )}
        </Flex>
    )
}

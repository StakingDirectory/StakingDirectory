import React from "react"

import { Flex, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faCode } from "@fortawesome/free-solid-svg-icons"

export default function WithdrawalKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider.withdrawalKey.includes("user") && (
                <Tooltip label={"Withdrawal keys are controlled by the user"} openDelay={0}>
                    <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                </Tooltip>
            )}
            {provider.withdrawalKey.includes("smartContract") && (
                <Tooltip label={"Withdrawal keys are controlled by a smart contract"} openDelay={0}>
                    <FontAwesomeIcon icon={faCode} size="lg" />
                </Tooltip>
            )}
        </Flex>
    )
}

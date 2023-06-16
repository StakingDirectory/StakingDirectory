import React from "react"

import { Flex, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faCode } from "@fortawesome/free-solid-svg-icons"

export default function WithdrawalKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5} mt={2}>
            {provider.withdrawalKey.includes("userWithdrawal") && (
                <Tooltip label={"Withdrawal keys are controlled by the user"} openDelay={0}>
                    <FontAwesomeIcon icon={faUserAstronaut} />
                </Tooltip>
            )}
            {provider.withdrawalKey.includes("smartContract") && (
                <Tooltip label={"Withdrawal keys are controlled by a smart contract"} openDelay={0}>
                    <FontAwesomeIcon icon={faCode} />
                </Tooltip>
            )}
        </Flex>
    )
}

import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faCode } from "@fortawesome/free-solid-svg-icons"

export default function WithdrawalKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider.withdrawalKey.includes("user") && <FontAwesomeIcon icon={faUserAstronaut} size="lg" />}
            {provider.withdrawalKey.includes("smartContract") && <FontAwesomeIcon icon={faCode} size="lg" />}
        </Flex>
    )
}

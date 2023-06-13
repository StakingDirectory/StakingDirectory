import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding } from "@fortawesome/free-solid-svg-icons"

export default function ValidatorKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider.validatorKey.includes("user") && <FontAwesomeIcon icon={faUserAstronaut} size="lg" />}
            {provider.validatorKey.includes("service") && <FontAwesomeIcon icon={faBuilding} size="lg" />}
        </Flex>
    )
}

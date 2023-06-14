import React from "react"

import { Flex, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding } from "@fortawesome/free-solid-svg-icons"

export default function ValidatorKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider.validatorKey.includes("user") && (
                <Tooltip label={"Validator keys are controlled by the user"} openDelay={0}>
                    <FontAwesomeIcon icon={faUserAstronaut} size="lg" />
                </Tooltip>
            )}

            {provider.validatorKey.includes("service") && (
                <Tooltip label={"Validator keys are controlled by the service"} openDelay={0}>
                    <FontAwesomeIcon icon={faBuilding} size="lg" />
                </Tooltip>
            )}
        </Flex>
    )
}

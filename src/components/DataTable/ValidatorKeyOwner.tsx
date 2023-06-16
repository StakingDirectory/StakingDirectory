import React from "react"

import { Flex, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding, faServer } from "@fortawesome/free-solid-svg-icons"

export default function ValidatorKeyOwner({ provider }) {
    return (
        <Flex justifyContent={"center"} gap={5}>
            {provider.validatorKey.includes("userValidator") && (
                <Tooltip label={"Validator keys are controlled by the user"} openDelay={0}>
                    <FontAwesomeIcon icon={faUserAstronaut} />
                </Tooltip>
            )}
            {provider.validatorKey.includes("service") && (
                <Tooltip label={"Validator keys are controlled by the service"} openDelay={0}>
                    <FontAwesomeIcon icon={faBuilding} />
                </Tooltip>
            )}
            {provider.validatorKey.includes("nodeOperator") && (
                <Tooltip label={"Validator keys are controlled by the node operator"} openDelay={0}>
                    <FontAwesomeIcon icon={faServer} />
                </Tooltip>
            )}
        </Flex>
    )
}

import React from "react"
import { Flex } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dataProps from "public/data/dataProps"

export default function ProviderType({ provider }) {
    return (
        <Flex direction={"row"} justifyContent={"center"} alignContent={"center"} fontWeight={"bold"} mt={1}>
            {(provider.providerType == "hardware" || provider.providerType == "software" || provider.providerType == "saas") && (
                <Flex alignItems={"center"} gap={1}>
                    {/* <FontAwesomeIcon icon={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.providerType)?.icon} /> */}
                    {dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.providerType)?.text}
                </Flex>
            )}

            {provider.providerType == "indexToken" && <Flex color="blue">{provider?.lstName}</Flex>}
            {provider.providerType == "lst" && <Flex color="blue">{provider?.lstName}</Flex>}
        </Flex>
    )
}

import { Flex } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ProviderType({ provider }) {
    return (
        <Flex direction={"row"} justifyContent={"center"} alignContent={"center"} fontWeight={"bold"} mt={1}>
            {(provider.providerType == "hardware" || provider.providerType == "software" || provider.providerType == "saas") && (
                <Flex alignItems={"center"} gap={1}>
                    {providerProperties.find((prop) => prop.value === provider.providerType)?.name}
                </Flex>
            )}

            {provider.providerType == "indexToken" && <Flex color="blue">{provider?.lstName}</Flex>}
            {provider.providerType == "lst" && <Flex color="blue">{provider?.lstName}</Flex>}
        </Flex>
    )
}

import { Flex } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ProviderType({ provider }) {
    return (
        <Flex direction={"row"} justifyContent={"center"} alignContent={"center"} fontWeight={"bold"} mt={1}>
            {provider.providerType == "indexToken" && <Flex>{provider?.lstName}</Flex>}
            {provider.providerType == "lst" && <Flex>{provider?.lstName}</Flex>}
        </Flex>
    )
}

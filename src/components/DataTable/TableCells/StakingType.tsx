import { Flex } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function StakingType({ provider }) {
    return (
        <>
            <Flex
                direction={"row"}
                justifyContent={"center"}
                color={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.color}
                fontWeight={"bold"}
            >
                <Flex alignItems={"center"} gap={1}>
                    {providerProperties.find((prop) => prop.value === provider.stakingType)?.name}
                </Flex>
            </Flex>
            <Flex direction={"row"} justifyContent={"center"} alignContent={"center"} fontWeight={"bold"}>
                {provider.stakingType == "indexToken" && <Flex mt={1}>{provider?.lstName}</Flex>}
                {provider.stakingType == "lst" && <Flex mt={1}>{provider?.lstName}</Flex>}
            </Flex>
        </>
    )
}

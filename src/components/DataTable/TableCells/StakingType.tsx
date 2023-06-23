import { Flex } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"

export default function StakingType({ provider }) {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            color={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.color}
            fontWeight={"bold"}
        >
            <Flex alignItems={"center"} gap={1}>
                {dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.text}
            </Flex>
        </Flex>
    )
}

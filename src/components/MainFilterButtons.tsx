import React, { useState } from "react"

import { Flex, Text, Box, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faDownLong, faPencil, faRightLong, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons"

export default function MainFilterButton({ dataFilter, setDataFilter }) {
    return (
        <Flex w={"100%"} direction={"row"} justifyContent={"space-between"} wrap={"wrap"} gap={3} mb={10}>
            <Flex color="pink" alignItems={"center"} ml={2} fontWeight={"bold"} fontSize="xl">
                Quick filters
            </Flex>
            <Flex w={"fit-content"} direction={"row"} justifyContent={"left"} wrap={"wrap"} gap={3} mb={10}>
                <Button variant={"MainFilterButton"}>I have 32 ETH and I want to solo stake</Button>
                <Button variant={"MainFilterButton"}>I have 32 ETH or less and want to stake in a pool</Button>
                <Button variant={"MainFilterButton"}>
                    <Flex wrap={"wrap"}>I just want to earn rewards for holding a liquid staking token</Flex>
                </Button>
            </Flex>
        </Flex>
    )
}

import React, { useState } from "react"

import { useBreakpointValue, Flex, Text, Box, Link, Collapse, MenuButton, Menu } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faDownLong, faPencil, faRightLong, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"

const InfoBlock = ({ icon, color, children }) => (
    <Flex wrap={{ base: "wrap", sm: "nowrap" }} gap={5}>
        <Flex alignItems={"center"} justifyContent={"center"} grow={1} minW={"60px"} color={color} mt={{ base: "20px", sm: "0" }}>
            <FontAwesomeIcon icon={icon} size={"2x"} />
        </Flex>
        <Text textAlign={{ base: "center", sm: "inherit" }} fontWeight={"medium"}>
            {children}
        </Text>
    </Flex>
)

export default function MainFilterButton() {
    const [isOpen, setIsOpen] = useState(false)

    return <Flex w={"100%"} maxW={"1420px"} px={{ base: "10px", sm: "2vw", xl: "5vw", "2xl": "3vw" }} mb={10}></Flex>
}

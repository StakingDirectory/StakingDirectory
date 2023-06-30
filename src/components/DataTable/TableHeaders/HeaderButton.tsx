import React from "react"

import { Flex, Box, MenuButton } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

export default function HeaderButton({ dataFilter, id, text, filterDisabledColor }) {
    const textElements = text.split("<br />").map((item, index) => (
        <React.Fragment key={index}>
            {item}
            {index !== text.split("<br />").length - 1 && <br />}
        </React.Fragment>
    ))

    return (
        <MenuButton>
            <Flex gap={1} alignItems={"end"}>
                <Box fontSize={"sm"} fontWeight={"extrabold"}>
                    {textElements}
                </Box>
                <Box color={dataFilter && dataFilter[id] /* && dataFilter.type != "hardware" */ ? "pink" : filterDisabledColor}>
                    <FontAwesomeIcon icon={faFilter} size={"lg"} />
                </Box>
            </Flex>
        </MenuButton>
    )
}

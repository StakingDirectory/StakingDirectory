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
                <Box>{textElements}</Box>
                <Box color={dataFilter && dataFilter[id] ? "purple" : filterDisabledColor}>
                    <FontAwesomeIcon icon={faFilter} />
                </Box>
            </Flex>
        </MenuButton>
    )
}

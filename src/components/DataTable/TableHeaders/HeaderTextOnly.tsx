import React from "react"

import { Flex, Box } from "@chakra-ui/react"

export default function HeaderTextOnly({ text }) {
    const textElements = text.split("<br />").map((item, index) => (
        <React.Fragment key={index}>
            {item}
            {index !== text.split("<br />").length - 1 && <br />}
        </React.Fragment>
    ))

    return (
        <Flex gap={1} alignItems={"center"} justifyContent={"center"} p={"10px"}>
            <Box fontSize={"sm"} fontWeight={"extrabold"}>
                {textElements}
            </Box>
        </Flex>
    )
}

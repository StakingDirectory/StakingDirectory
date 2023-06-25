import React, { useRef, useEffect, useState } from "react"

import { Flex, Text, Box, Code, Button, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function EditorFooter({ onClose, updatedValues }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Flex direction={"column"} grow={1}>
            <Flex justifyContent={"space-between"} alignItems={"end"} grow={1}>
                {JSON.stringify(updatedValues) != "{}" && (
                    <Flex
                        className={"editedLozenge"}
                        paddingY={"10px"}
                        borderBottomRadius={isOpen ? 0 : 10}
                        alignItems={"center"}
                        gap={2}
                        cursor={"pointer"}
                        transition="all 0.2s"
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                    >
                        <Box
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            transition="all 0.2s"
                            size={"sm"}
                            transform={`rotate(${isOpen ? 90 : 0}deg)`}
                            mr={1}
                            ml={1}
                        />
                        <Text pr={2}>Edited data</Text>
                    </Flex>
                )}
                <Flex mb={1}>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </Flex>
            </Flex>
            <Collapse in={isOpen}>
                <Code cursor={"default"} whiteSpace={"pre-wrap"} w={"100%"} maxH={"30vh"} p={3} borderRadius={10} borderTopLeftRadius={0}>
                    {JSON.stringify(updatedValues, null, 2)}
                </Code>
            </Collapse>
        </Flex>
    )
}

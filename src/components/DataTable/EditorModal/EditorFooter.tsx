import React, { useRef, useEffect, useState } from "react"

import { Flex, Text, Box, Code, Button, Collapse, Tooltip, IconButton } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

export default function EditorFooter({ onClose, updatedValues, setUpdatedValues }) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (JSON.stringify(updatedValues) == "{}") {
            setIsOpen(false)
        }
    }, [updatedValues])

    return (
        <Flex direction={"column"} grow={1}>
            <Flex justifyContent={"space-between"} alignItems={"end"} grow={1}>
                {JSON.stringify(updatedValues) != "{}" ? (
                    <Flex gap={3} alignItems={"end"}>
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
                        <Tooltip
                            placement={"top"}
                            gutter={8}
                            label={<Box className={"tooltipLabel"}>Reset all changes</Box>}
                            className="tooltipArrow"
                            hasArrow={true}
                        >
                            <IconButton
                                aria-label="Reset option"
                                icon={<FontAwesomeIcon icon={faRotateLeft} />}
                                transition="all 0.2s"
                                borderTopRadius={20}
                                borderBottomRadius={isOpen ? 0 : 20}
                                h={10}
                                onClick={() => {
                                    setUpdatedValues({})
                                }}
                            />
                        </Tooltip>
                    </Flex>
                ) : (
                    <Flex grow={1}></Flex>
                )}
                <Flex mb={1}>
                    <Button variant={"EditorSubmit"} isDisabled={JSON.stringify(updatedValues) != "{}" ? false : true}>
                        Suggest update
                    </Button>
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

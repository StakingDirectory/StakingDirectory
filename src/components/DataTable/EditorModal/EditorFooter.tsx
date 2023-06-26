import React, { useRef, useEffect, useState } from "react"
import axios from "axios"

import { Flex, Text, Box, Code, Button, Collapse, Tooltip, IconButton, Spinner } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-regular-svg-icons"

export default function EditorFooter({ onClose, provider, updatedValues, setUpdatedValues }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (Object.keys(updatedValues).length == 0) {
            setIsOpen(false)
        }
    }, [updatedValues])

    return (
        <Flex direction={"column"} grow={1}>
            <Flex justifyContent={"space-between"} alignItems={"end"} grow={1}>
                {Object.keys(updatedValues).length > 0 ? (
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
                            <Text pr={2}>What&apos;s changed?</Text>
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
                    <Button
                        variant={"EditorSubmit"}
                        isDisabled={Object.keys(updatedValues).length == 0 || loading}
                        onClick={() => {
                            setLoading(true)
                            if (process.env.NODE_ENV === "development") {
                                axios
                                    .post("/api/updateProvider", { id: provider.id, updatedValues })
                                    .then((res) => {
                                        console.log(res.data)
                                        setTimeout(() => {
                                            onClose()
                                            setLoading(false)
                                            setUpdatedValues({})
                                        }, 1000) // Delay to show the spinner
                                    })
                                    .catch((err) => {
                                        console.error(err)
                                        setLoading(false)
                                    })
                            } else {
                                // TODO: Send JSON to GitHub action
                            }
                        }}
                    >
                        <Flex justifyItems={"center"} gap={3}>
                            {loading ? (
                                <>
                                    <Text pt={"2px"}>{process.env.NODE_ENV === "development" ? "Saving..." : "Sending..."}</Text>
                                    <Spinner />
                                </>
                            ) : (
                                <>
                                    <Text>{process.env.NODE_ENV === "development" ? "Save data" : "Suggest update"}</Text>
                                    <FontAwesomeIcon icon={process.env.NODE_ENV === "development" ? faFloppyDisk : faPaperPlane} size={"lg"} />
                                </>
                            )}
                        </Flex>
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

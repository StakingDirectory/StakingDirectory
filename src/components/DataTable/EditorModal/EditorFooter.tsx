import React, { useRef, useEffect, useState } from "react"
import axios from "axios"

import { useToast, Flex, Text, Box, Code, Button, Collapse, Tooltip, IconButton, Spinner, Link, CloseButton } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-regular-svg-icons"

import NextLink from "next/link"

export default function EditorFooter({ onClose, provider, updatedValues, setUpdatedValues, newProvider }) {
    const toast = useToast()

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const closeEditor = () => {
        toast.closeAll()
        setUpdatedValues({})
        setLoading(false)
        onClose()
    }

    useEffect(() => {
        if (Object.keys(updatedValues).length == 0) {
            setIsOpen(false)
        }
    }, [updatedValues])

    return (
        <Flex direction={"column"} grow={1}>
            <Flex justifyContent={"space-between"} alignItems={"end"} grow={1} wrap={"wrap-reverse"} gap={2}>
                {Object.keys(updatedValues).length > 0 ? (
                    <Flex gap={3} alignItems={"end"}>
                        <Flex
                            className={"editedLozenge"}
                            paddingTop={2}
                            paddingBottom={isOpen ? 3 : 2}
                            h={isOpen ? "52px" : 10}
                            borderBottomRadius={isOpen ? 0 : 10}
                            mb={isOpen ? 0 : 1}
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
                    </Flex>
                ) : (
                    <Flex grow={1}></Flex>
                )}
                <Flex mb={isOpen ? 3 : 1} gap={3}>
                    <Button variant={"EditorCancel"} onClick={closeEditor}>
                        <Flex justifyItems={"center"} gap={3}>
                            <Text>Cancel</Text>
                        </Flex>
                    </Button>
                    <Button
                        variant={"EditorSubmit"}
                        isDisabled={Object.keys(updatedValues).length == 0 || loading}
                        onClick={() => {
                            setLoading(true)
                            const api = process.env.NODE_ENV === "development" ? "/api/updateProvider" : "/api/triggerWorkflow"
                            axios
                                .post(api, {
                                    providerId: newProvider ? updatedValues.id : provider.id,
                                    updatedValues,
                                    providerName: newProvider ? updatedValues.name : provider.name,
                                })
                                .then((res) => {
                                    console.log(res.data)
                                    setTimeout(() => {
                                        setUpdatedValues({})
                                        setLoading(false)
                                        onClose()
                                        toast({
                                            id: "submit-success",
                                            isClosable: true,
                                            position: "top",
                                            render: () => (
                                                <Box position="relative">
                                                    <Flex
                                                        direction={"column"}
                                                        alignItems={"center"}
                                                        gap={2}
                                                        className={"ToastBaseStyle ToastSuccess"}
                                                    >
                                                        {process.env.NODE_ENV != "development" && (
                                                            <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
                                                        )}
                                                        <Text fontWeight={"extrabold"}>
                                                            🥳 Successfully{" "}
                                                            {process.env.NODE_ENV === "development" ? "saved change" : "submitted update"} 🥳
                                                        </Text>
                                                        {process.env.NODE_ENV != "development" && (
                                                            <Text fontWeight={"bold"} textAlign={"center"}>
                                                                A PR for your suggestion will automatically be created in the next 5 minutes on{" "}
                                                                <Link
                                                                    as={NextLink}
                                                                    href={"https://github.com/StakingDirectory/StakingDirectory/pulls"}
                                                                    target="_blank"
                                                                >
                                                                    <Text as={"span"} decoration={"underline"}>
                                                                        GitHub ↗️
                                                                    </Text>
                                                                </Link>
                                                                <Text as={"span"}>
                                                                    {" "}
                                                                    for {newProvider ? updatedValues.name : provider.name} and will be reviewed by our
                                                                    team as soon as possible! (Provider ID:{" "}
                                                                    {newProvider ? updatedValues.id : provider.id})
                                                                </Text>
                                                                <Text pt={3}>Thank you for supporting the Ethereum staking ecosystem 🙏</Text>
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                </Box>
                                            ),
                                            duration: process.env.NODE_ENV === "development" ? 1000 : 10000,
                                        })
                                    }, 1000) // Delay to show the spinner
                                })
                                .catch((err) => {
                                    if (!toast.isActive("submit-error")) {
                                        toast({
                                            id: "submit-error",
                                            position: "top",
                                            render: () => (
                                                <Flex direction={"column"} alignItems={"center"} gap={2} className={"ToastBaseStyle ToastError"}>
                                                    <Text fontWeight={"extrabold"}>
                                                        Error {process.env.NODE_ENV === "development" ? "saving change" : "submitting update"}
                                                    </Text>
                                                    <Text>{err?.code}</Text>
                                                    <Text>{err?.message}</Text>
                                                </Flex>
                                            ),
                                            duration: 3000,
                                        })
                                    }
                                    console.error(err)
                                    setLoading(false)
                                })
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
                                    <Text>{process.env.NODE_ENV === "development" ? "Save changes" : "Suggest update"}</Text>
                                    <FontAwesomeIcon icon={process.env.NODE_ENV === "development" ? faFloppyDisk : faPaperPlane} size={"lg"} />
                                </>
                            )}
                        </Flex>
                    </Button>
                </Flex>
            </Flex>
            <Collapse in={isOpen}>
                <Code
                    overflow={"scroll"}
                    cursor={"default"}
                    whiteSpace={"pre-wrap"}
                    w={"100%"}
                    maxH={"30vh"}
                    p={3}
                    borderRadius={10}
                    borderTopLeftRadius={0}
                >
                    {JSON.stringify(updatedValues, null, 2)}
                </Code>
            </Collapse>
        </Flex>
    )
}

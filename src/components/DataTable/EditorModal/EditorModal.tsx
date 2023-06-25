import React, { useRef, useEffect, useState } from "react"

import {
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Code,
    IconButton,
    Tooltip,
} from "@chakra-ui/react"

import OptionSelector from "./OptionSelector"
import EditorOption from "./EditorOption"
import EditorFooter from "./EditorFooter"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const environment = process.env.NODE_ENV

export default function EditorModal({ isOpen, onClose, provider }) {
    const [currentSelection, setCurrentSelection] = useState("allOptions")
    const [updatedValues, setUpdatedValues] = useState({})

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent minH="50vh" maxH={"90vh"} minW="50vw" overflow={"hidden"}>
                    <ModalHeader fontWeight={"extrabold"} fontSize={"initial"}>
                        <Flex gap={5} alignItems={"center"} wrap={"wrap"}>
                            <Flex gap={3} alignItems={"center"} fontSize={"xl"}>
                                <Image objectFit="contain" boxSize={8} src={provider.logo.src} alt={provider.logo.alt} borderRadius={"100%"} />
                                <Text isTruncated>{provider.name}</Text>
                            </Flex>
                            <OptionSelector
                                provider={provider}
                                currentSelection={currentSelection}
                                setCurrentSelection={setCurrentSelection}
                                updatedValues={updatedValues}
                            />
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton mt={1} />
                    <ModalBody overflowY={"scroll"} pt={0}>
                        {(currentSelection == "name" || currentSelection == "allOptions") && (
                            <EditorOption
                                id="name"
                                name="Name"
                                inputType="input"
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        )}
                        {(currentSelection == "status" || currentSelection == "allOptions") && (
                            <EditorOption
                                id="status"
                                name="Status"
                                inputType="select"
                                options={[
                                    { value: "active", name: "Active" },
                                    { value: "dev", name: "In development" },
                                ]}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <EditorFooter onClose={onClose} updatedValues={updatedValues} />
                    </ModalFooter>
                </ModalContent>
            ) : (
                <ModalContent>
                    <ModalHeader>🏗️ Editor coming soon! 🏗️</ModalHeader>
                    <ModalCloseButton />
                </ModalContent>
            )}
        </Modal>
    )
}

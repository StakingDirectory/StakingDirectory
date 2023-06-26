import React, { useRef, useEffect, useState } from "react"

import {
    useToast,
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

export default function EditorModal({ isOpen, onClose, provider }) {
    const toast = useToast()

    const [currentSelection, setCurrentSelection] = useState("allOptions")
    const [updatedValues, setUpdatedValues] = useState({})

    return (
        <Modal
            isOpen={isOpen}
            isCentered
            closeOnOverlayClick={true}
            onClose={() => {
                if (Object.keys(updatedValues).length > 0) {
                    if (!toast.isActive("data-changed")) {
                        toast({
                            id: "data-changed",
                            position: "top",
                            render: () => (
                                <Box color="white" mt={3} p={3} bg="orange" borderRadius={10} fontWeight={"bold"}>
                                    Save or discard your changes before closing the editor
                                </Box>
                            ),
                            duration: 3000,
                        })
                    }
                } else {
                    toast.closeAll()
                    onClose()
                }
            }}
        >
            <ModalOverlay />
            {process.env.NODE_ENV === "development" ? (
                <ModalContent h={"80vh"} minW="50vw" overflow={"hidden"}>
                    <ModalHeader fontWeight={"extrabold"} fontSize={"initial"}>
                        <Flex gap={5} alignItems={"center"} wrap={"wrap"} justifyContent={"space-between"}>
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
                    {/* <ModalCloseButton mt={1} /> */}
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
                        <EditorFooter onClose={onClose} provider={provider} updatedValues={updatedValues} setUpdatedValues={setUpdatedValues} />
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

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
import EditorOptionHeader from "./EditorOptionHeader"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const environment = process.env.NODE_ENV

const EditorOptionContainer = ({ children }) => {
    return (
        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
            {children}
        </Flex>
    )
}

export default function EditorModal({ isOpen, onClose, provider }) {
    const [currentSelection, setCurrentSelection] = useState("allOptions")
    const [updatedValues, setUpdatedValues] = useState({})

    const nameInputRef = useRef<HTMLInputElement | null>(null)

    const updateValues = (option, value) => {
        if (JSON.stringify(value) === JSON.stringify(provider[option]) || value === "") {
            const updatedValuesCopy = { ...updatedValues }
            delete updatedValuesCopy[option]
            setUpdatedValues(updatedValuesCopy)
        } else {
            setUpdatedValues({ ...updatedValues, [option]: value })
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent minH="50vh" minW="50vw">
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
                    <ModalBody pt={0}>
                        {currentSelection == "name" || currentSelection == "allOptions" ? (
                            <EditorOptionContainer>
                                <EditorOptionHeader
                                    id={"name"}
                                    name={"Update Name"}
                                    updatedValues={updatedValues}
                                    setUpdatedValues={setUpdatedValues}
                                />
                                <InputGroup>
                                    <InputLeftAddon>Name</InputLeftAddon>
                                    <Input
                                        variant={"EditorInput"}
                                        value={updatedValues["name"] ? updatedValues["name"] : provider.name}
                                        placeholder="Provider name..."
                                        ref={nameInputRef}
                                        onChange={() => {
                                            if (nameInputRef.current) {
                                                updateValues("name", nameInputRef.current.value)
                                            }
                                        }}
                                    />
                                </InputGroup>
                            </EditorOptionContainer>
                        ) : null}
                        {currentSelection == "status" || currentSelection == "allOptions" ? (
                            <EditorOptionContainer>
                                <EditorOptionHeader
                                    id={"status"}
                                    name={"Update Status"}
                                    updatedValues={updatedValues}
                                    setUpdatedValues={setUpdatedValues}
                                />
                                <InputGroup>
                                    <InputLeftAddon fontWeight={"bold"}>Status</InputLeftAddon>
                                    <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
                                        <MenuButton as={Button} variant={"EditorSelector"} mr={8} borderLeftRadius={0}>
                                            <Flex gap={2} justifyContent={"space-between"}>
                                                <Text>
                                                    {
                                                        providerProperties.find(
                                                            (prop) =>
                                                                prop.value === (updatedValues["status"] ? updatedValues["status"] : provider.status)
                                                        )?.name
                                                    }
                                                </Text>
                                                <Box>
                                                    <FontAwesomeIcon icon={faChevronDown} />
                                                </Box>
                                            </Flex>
                                        </MenuButton>
                                        <MenuList minW={1}>
                                            <MenuOptionGroup value={updatedValues["status"] ? updatedValues["status"] : provider.status} type="radio">
                                                {[
                                                    { value: "active", name: "Active" },
                                                    { value: "dev", name: "In development" },
                                                ].map((option) => (
                                                    <MenuItemOption
                                                        key={option.value}
                                                        value={option.value}
                                                        onClick={() => updateValues("status", option.value)}
                                                    >
                                                        {option.name}
                                                    </MenuItemOption>
                                                ))}
                                            </MenuOptionGroup>
                                        </MenuList>
                                    </Menu>
                                </InputGroup>
                            </EditorOptionContainer>
                        ) : null}
                        {updatedValues && <Code>{JSON.stringify(updatedValues, null, 2)}</Code>}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
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

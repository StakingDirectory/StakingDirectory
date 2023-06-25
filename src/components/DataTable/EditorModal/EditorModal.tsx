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
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const environment = process.env.NODE_ENV

export default function EditorModal({ isOpen, onClose, provider }) {
    const [currentSelection, setCurrentSelection] = useState("")

    return (
        <Modal variant={"EditorSelector"} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent minH="50vh" minW="50vw">
                    <ModalHeader fontWeight={"extrabold"}>
                        <Flex gap={3}>
                            Update: <Image objectFit="contain" boxSize={8} src={provider.logo.src} alt={provider.logo.alt} borderRadius={"100%"} />
                            {provider.name}
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton mt={1} />
                    <ModalBody>
                        {/* <Text fontWeight={"bold"}>Select an option to update:</Text> */}
                        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
                            <MenuButton as={Button} variant={"EditorSelector"}>
                                <Flex gap={2} minW={250} justifyContent={"space-between"}>
                                    <Text>
                                        {currentSelection == "allOptions"
                                            ? "All options"
                                            : currentSelection == "stakeFromHome"
                                            ? "Stake from home"
                                            : currentSelection
                                            ? providerProperties.find((prop) => prop.value === currentSelection)?.name
                                            : "Select option..."}
                                    </Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList minW={1} maxH={275} overflow={"scroll"}>
                                <MenuOptionGroup>
                                    <MenuItemOption
                                        value={"allOptions"}
                                        onClick={() => {
                                            setCurrentSelection("allOptions")
                                        }}
                                    >
                                        Show all options
                                    </MenuItemOption>
                                    <MenuDivider borderWidth={5} m={0} />
                                    {providerProperties
                                        // Filter out properties without a name
                                        .filter((prop) => prop.name && provider[prop.value])
                                        // Sort the remaining properties alphabetically
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        // Map over properties to render MenuItems
                                        .map((prop, i) => (
                                            <MenuItemOption
                                                key={i}
                                                value={prop.value}
                                                onClick={() => {
                                                    setCurrentSelection(prop.value)
                                                }}
                                            >
                                                {prop.name == "Yes!" ? "Stake from home" : prop.name}
                                            </MenuItemOption>
                                        ))}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
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

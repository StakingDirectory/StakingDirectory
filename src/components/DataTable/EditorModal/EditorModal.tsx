import {
    useDisclosure,
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
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const environment = process.env.NODE_ENV

export default function EditorModal({ isOpen, onClose, provider }) {
    return (
        <Modal variant={"EditorSelector"} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent minH="50vh" minW="50vw">
                    <ModalHeader fontWeight={"extrabold"}>Update {provider.name}</ModalHeader>
                    <ModalCloseButton mt={1} />
                    <ModalBody>
                        <Text fontWeight={"bold"}>Select the content you want to update:</Text>
                        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
                            <MenuButton as={Button} variant={"EditorSelector"}>
                                <Flex gap={2} minW={200} justifyContent={"space-between"}>
                                    <Text>Select...</Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList minW={1} maxH={295} overflow={"scroll"}>
                                {providerProperties
                                    // Filter out properties without a name
                                    .filter((prop) => prop.name && provider[prop.value])
                                    // Sort the remaining properties alphabetically
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    // Map over properties to render MenuItems
                                    .map((prop, i) => (
                                        <MenuItem key={i}>{prop.name}</MenuItem>
                                    ))}
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

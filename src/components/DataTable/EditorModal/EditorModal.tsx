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
import { faEllipsisV, faEdit, faChevronDown } from "@fortawesome/free-solid-svg-icons"

const environment = process.env.NODE_ENV

export default function EditorModal({ isOpen, onClose, provider }) {
    return (
        <Modal variant={"test"} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent minH="50vh" minW="50vw">
                    <ModalHeader fontWeight={"extrabold"}>Update {provider.name}</ModalHeader>
                    <ModalCloseButton mt={1} />
                    <ModalBody>
                        <Text fontWeight={"bold"}>Select the content you want to update:</Text>
                        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
                            <MenuButton cursor={"pointer"}>
                                <Flex gap={2}>
                                    <Text>Select...</Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList minW={1} maxH={300} overflow={"scroll"}>
                                {Object.entries(provider).map(([key, value], i) => {
                                    return <MenuItem key={i}>{key}</MenuItem>
                                })}
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

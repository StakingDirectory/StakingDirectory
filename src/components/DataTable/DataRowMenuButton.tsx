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
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons"

const environment = process.env.NODE_ENV

const EditorModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            {environment === "development" ? (
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Content Text</ModalBody>

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

export default function DataRowMenuButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Menu variant={"DataTableOption"} gutter={3}>
                <MenuButton aria-label="Options" borderRadius={6} w={8} h={8} cursor={"pointer"}>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Flex>
                </MenuButton>
                <MenuList minW={1}>
                    <MenuItem onClick={onOpen} icon={<FontAwesomeIcon icon={faEdit} />}>
                        Suggest update
                    </MenuItem>
                </MenuList>
            </Menu>
            <EditorModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

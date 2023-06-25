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

import EditorModal from "./EditorModal/EditorModal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons"

const environment = process.env.NODE_ENV

export default function DataRowMenuButton({ provider }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Menu variant={"DataTableOption"} placement="right" gutter={3}>
                <MenuButton aria-label="Options" borderRadius={10} w={8} h={8} cursor={"pointer"} onClick={(e) => e.stopPropagation()}>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Flex>
                </MenuButton>
                <MenuList minW={1}>
                    <MenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onOpen()
                        }}
                        icon={<FontAwesomeIcon icon={faEdit} />}
                    >
                        Suggest update
                    </MenuItem>
                </MenuList>
            </Menu>
            <EditorModal isOpen={isOpen} onClose={onClose} provider={provider} />
        </>
    )
}

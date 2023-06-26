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
    Tooltip,
    Box,
} from "@chakra-ui/react"

import EditorModal from "./EditorModal/EditorModal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faEdit, faHammer } from "@fortawesome/free-solid-svg-icons"

export default function DataRowMenuButton({ provider }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Menu variant={"DataTableOption"} placement="right" gutter={3}>
                {/* <MenuButton aria-label="Options" borderRadius={10} w={8} h={8} cursor={"pointer"} onClick={(e) => e.stopPropagation()}>
                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Flex>
                </MenuButton> */}

                {/* TODO: This whole tooltip Component should be removed after the initial launch and feedback phase */}
                <Tooltip
                    placement={"top"}
                    gutter={10}
                    label={
                        <Flex className={"tooltipLabel"} direction={"column"} gap={2}>
                            <Box>Does something need fixing?</Box>
                            <Box>Let us know!</Box>
                        </Flex>
                    }
                    className="tooltipArrow"
                    hasArrow={true}
                >
                    <MenuButton aria-label="Options" borderRadius={10} w={8} h={8} cursor={"pointer"} onClick={(e) => e.stopPropagation()}>
                        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                            <FontAwesomeIcon icon={faHammer} />
                        </Flex>
                    </MenuButton>
                </Tooltip>

                <MenuList minW={1}>
                    <MenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onOpen()
                        }}
                        icon={<FontAwesomeIcon icon={faEdit} />}
                    >
                        {process.env.NODE_ENV != "development" ? "Suggest update" : "Edit data"}
                    </MenuItem>
                </MenuList>
            </Menu>
            <EditorModal isOpen={isOpen} onClose={onClose} provider={provider} />
        </>
    )
}

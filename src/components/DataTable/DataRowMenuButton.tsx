import { useState } from "react"

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
    // This hover state is used to stop a bug where the
    // tooltip reopens after closing the menu
    const [isHovered, setIsHovered] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Menu variant={"DataTableOption"} placement="right" gutter={3}>
                {/* TODO: Uncomment this section after removing the Tooltip component below after the initial launch and feedback phase */}
                {/* <MenuButton aria-label="Options" borderRadius={10} w={8} h={8} cursor={"pointer"} onClick={(e) => e.stopPropagation()}>
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
                        {process.env.NODE_ENV != "development" ? "Suggest update" : "Edit data"}
                    </MenuItem>
                </MenuList> */}

                {/* TODO: Remove Tooltip Component (and everything inside it) after the initial launch and feedback phase */}
                <Tooltip
                    isOpen={isHovered && !isOpen}
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
                    <MenuButton
                        aria-label="Options"
                        borderRadius={10}
                        w={8}
                        h={8}
                        cursor={"pointer"}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => {
                            e.stopPropagation()
                            onOpen()
                        }}
                    >
                        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                            <FontAwesomeIcon icon={faHammer} />
                        </Flex>
                    </MenuButton>
                </Tooltip>
            </Menu>
            <EditorModal isOpen={isOpen} onClose={onClose} provider={provider} />
        </>
    )
}

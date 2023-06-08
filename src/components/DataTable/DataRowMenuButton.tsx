import { Flex, Box, useColorModeValue, Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faEdit } from "@fortawesome/free-solid-svg-icons"

export default function DataRowMenuButton() {
    return (
        <Menu>
            <MenuButton aria-label="Options" borderRadius={6} w={6} h={8} cursor={"pointer"}>
                <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </Flex>
            </MenuButton>
            <MenuList minW={1}>
                <MenuItem icon={<FontAwesomeIcon icon={faEdit} />}>Suggest update</MenuItem>
            </MenuList>
        </Menu>
    )
}

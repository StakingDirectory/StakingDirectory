import {
    Flex,
    Grid,
    Box,
    Image,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment }) {
    const isSSR = typeof window === "undefined"

    const SecurityShield = () => {
        return (
            <Flex justifyContent={"center"}>
                <Grid templateColumns={"repeat(2, 1fr)"} border={"2px solid #FFD700"} borderRadius={5} overflow={"hidden"} w="44px">
                    <Box borderRight={"1px solid #FFD700"} borderBottom={"1px solid #FFD700"} bg="#07A63D" h={5}></Box>
                    <Box borderLeft={"1px solid #FFD700"} borderBottom={"1px solid #FFD700"} bg="#07A63D" h={5}></Box>
                    <Box borderRight={"1px solid #FFD700"} borderTop={"1px solid #FFD700"} bg="#07A63D" h={5}></Box>
                    <Box borderLeft={"1px solid #FFD700"} borderTop={"1px solid #FFD700"} bg="#07A63D" h={5}></Box>
                </Grid>
            </Flex>
        )
    }

    const EthereumAligned = () => {
        return (
            <Flex justifyContent={"center"}>
                <Grid templateColumns={"repeat(2, 1fr)"} border={"2px solid #424850"} borderRadius={5} overflow={"hidden"} w="44px">
                    <Box borderRight={"1px solid #424850"} borderBottom={"1px solid #424850"} bg="#EC420C" h={5}></Box>
                    <Box borderLeft={"1px solid #424850"} borderBottom={"1px solid #424850"} bg="#07A63D" h={5}></Box>
                    <Box borderRight={"1px solid #424850"} borderTop={"1px solid #424850"} bg="#07A63D" h={5}></Box>
                    <Box borderLeft={"1px solid #424850"} borderTop={"1px solid #424850"} bg="#EC420C" h={5}></Box>
                </Grid>
            </Flex>
        )
    }

    return (
        <Box mt={10} mb={50} width={"100%"} maxW={"1216px"} px={{ base: 0, lg: 20 }}>
            <TableContainer>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th></Th>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Rewards</Th>
                            <Th>Fee</Th>
                            <Th>Min Deposit</Th>
                            <Th>Trust</Th>
                            <Th>Security</Th>
                            <Th>
                                Ethereum
                                <br />
                                Aligned
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr borderBottomWidth={1} h={14}>
                            <Td w={12} minW={12}>
                                <Image objectFit="contain" width={8} height={8} src="./images/LidoLogo.png" alt={"Lido Logo"} borderRadius={"100%"} />
                            </Td>
                            <Td textAlign={"end"} fontWeight={"extrabold"}>
                                Lido
                            </Td>
                            <Td>LST</Td>
                            <Td>4.3%</Td>
                            <Td>10%</Td>
                            <Td>Any amount</Td>
                            <Td>Smart</Td>
                            <Td>
                                <SecurityShield />
                            </Td>
                            <Td>
                                <EthereumAligned />
                            </Td>
                            <Td w={5}>
                                <Menu>
                                    <MenuButton
                                        as={Box}
                                        aria-label="Options"
                                        borderRadius={5}
                                        w={6}
                                        h={8}
                                        cursor={"pointer"}
                                        _hover={{ border: "1px solid white" }}
                                    >
                                        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </Flex>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Suggest change</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

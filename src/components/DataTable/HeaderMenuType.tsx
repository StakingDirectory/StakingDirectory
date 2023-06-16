import React from "react"

import { Flex, Box, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeaderMenuType({ id, headerValues, dataFilter, setDataFilter }) {
    const updateFilter = (values) => {
        if (values.length === 0) {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter[id]
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, [id]: values })
        }
    }

    return (
        <MenuList minWidth={1} key={JSON.stringify(dataFilter[id])}>
            <MenuOptionGroup defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter} title="Staking Type">
                {headerValues
                    .find((obj) => obj.id === id)
                    ?.options?.map(
                        (option) =>
                            (option.value === "dedicated" ||
                                option.value === "pooled" ||
                                option.value === "lst" ||
                                option.value === "indexToken") && (
                                <MenuItemOption key={option.value} value={option.value} color={option.color} fontSize={"lg"}>
                                    <Flex gap={2} alignItems={"center"}>
                                        <Box width={6}>
                                            <FontAwesomeIcon icon={option.icon} />
                                        </Box>
                                        <Text>{option.text}</Text>
                                    </Flex>
                                </MenuItemOption>
                            )
                    )}
            </MenuOptionGroup>
            <MenuOptionGroup defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter} title="Provider Type">
                {headerValues
                    .find((obj) => obj.id === id)
                    ?.options?.map(
                        (option) =>
                            (option.value === "hardware" || option.value === "software" || option.value === "cloud") && (
                                <MenuItemOption key={option.value} value={option.value} color={option.color} fontSize={"lg"}>
                                    <Flex gap={2} alignItems={"center"}>
                                        <Box width={6}>
                                            <FontAwesomeIcon icon={option.icon} />
                                        </Box>
                                        <Text>{option.text}</Text>
                                    </Flex>
                                </MenuItemOption>
                            )
                    )}
            </MenuOptionGroup>
        </MenuList>
    )
}

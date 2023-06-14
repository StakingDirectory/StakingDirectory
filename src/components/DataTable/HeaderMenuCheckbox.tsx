import React from "react"

import { Flex, Box, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeaderMenuCheckbox({ id, headerMenuValues, dataFilter, setDataFilter }) {
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
        <MenuList minWidth={1}>
            <MenuOptionGroup key={JSON.stringify(dataFilter[id])} defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter}>
                {headerMenuValues
                    .find((obj) => obj.id === id)
                    ?.options.map((option) => (
                        <MenuItemOption
                            key={option.value}
                            value={option.value}
                            color={option.color}
                            fontSize={"lg"}
                            isChecked={dataFilter[id] && Array.isArray(dataFilter[id]) && dataFilter[id].includes(option.value)}
                        >
                            <Flex gap={2}>
                                <Box width={6}>
                                    <FontAwesomeIcon icon={option.icon} />
                                </Box>
                                <Text>{option.text}</Text>
                            </Flex>
                        </MenuItemOption>
                    ))}
            </MenuOptionGroup>
            <Box
                onClick={() => {
                    setDataFilter(
                        ((newDataFilter) => {
                            delete newDataFilter[id]
                            return newDataFilter
                        })({ ...dataFilter })
                    )
                }}
            >
                Clear filters
            </Box>
        </MenuList>
    )
}

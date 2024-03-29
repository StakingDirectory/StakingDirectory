import { Flex, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function HeaderMenuCheckbox({ id, dataFilter, setDataFilter }) {
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
                {dataProps
                    .find((obj) => obj.id === id)
                    ?.options?.map((option) => (
                        <MenuItemOption
                            key={option.value}
                            value={option.value}
                            color={option.color}
                            fontSize={"lg"}
                            isChecked={dataFilter[id] && Array.isArray(dataFilter[id]) && dataFilter[id].includes(option.value)}
                        >
                            <Flex gap={2}>
                                <Text>{providerProperties.find((prop) => prop.value === option.value)?.name}</Text>
                            </Flex>
                        </MenuItemOption>
                    ))}
            </MenuOptionGroup>
        </MenuList>
    )
}

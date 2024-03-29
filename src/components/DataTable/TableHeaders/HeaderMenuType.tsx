import { Flex, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function HeaderMenuType({ id, dataFilter, setDataFilter }) {
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
            <MenuOptionGroup defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter} title="Staking Type" fontWeight={"extrabold"}>
                {dataProps
                    .find((obj) => obj.id === id)
                    ?.options?.map((option) => (
                        <MenuItemOption key={option.value} value={option.value} color={option.color} fontSize={"lg"} fontWeight={"semibold"}>
                            <Flex gap={2} alignItems={"center"}>
                                <Text>{providerProperties.find((prop) => prop.value === option.value)?.name}</Text>
                            </Flex>
                        </MenuItemOption>
                    ))}
            </MenuOptionGroup>
        </MenuList>
    )
}

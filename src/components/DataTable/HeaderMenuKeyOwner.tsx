import React from "react"

import { Flex, Box, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function HeaderMenuKeyOwner({ dataProps, dataFilter, setDataFilter }) {
    const updateFilterValidator = (values) => {
        if (values.length === 0) {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter["validatorKey"]
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, ["validatorKey"]: values })
        }
    }
    const updateFilterWithdrawal = (values) => {
        if (values.length === 0) {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter["withdrawalKey"]
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, ["withdrawalKey"]: values })
        }
    }

    return (
        <MenuList minWidth={1} key={JSON.stringify(dataFilter["keyOwner"])}>
            <MenuOptionGroup value={dataFilter["validatorKey"] || []} type="checkbox" onChange={updateFilterValidator} title="Validator Key Owner">
                {dataProps
                    .find((obj) => obj.id === "validatorKey")
                    ?.options?.map((option) => (
                        <MenuItemOption key={option.value} value={option.value} color={option.color} fontSize={"lg"}>
                            <Flex gap={2} alignItems={"center"}>
                                {/* <Box width={6}>
                                    <FontAwesomeIcon icon={option.icon} />
                                </Box> */}
                                <Text>{option.text}</Text>
                            </Flex>
                        </MenuItemOption>
                    ))}
            </MenuOptionGroup>
            <MenuOptionGroup value={dataFilter["withdrawalKey"] || []} type="checkbox" onChange={updateFilterWithdrawal} title="Withdrawal Key Owner">
                {dataProps
                    .find((obj) => obj.id === "withdrawalKey")
                    ?.options?.map((option) => (
                        <MenuItemOption key={option.value} value={option.value} color={option.color} fontSize={"lg"}>
                            <Flex gap={2} alignItems={"center"}>
                                {/* <Box width={6}>
                                    <FontAwesomeIcon icon={option.icon} />
                                </Box> */}
                                <Text>{option.text}</Text>
                            </Flex>
                        </MenuItemOption>
                    ))}
            </MenuOptionGroup>
        </MenuList>
    )
}

import React from "react"

import { Flex, Box, MenuList, MenuOptionGroup, MenuItemOption, Text } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer } from "@fortawesome/free-solid-svg-icons"

export default function HeaderMenuCheckbox({ id, dataFilter, setDataFilter }) {
    const headerMenuCheckboxValues = [
        {
            id: "type",
            options: [
                { value: "dedicated", text: "Dedicated", color: "green", icon: faServer },
                { value: "pooled", text: "Pooled", color: "blue", icon: faUsers },
                { value: "lst", text: "LST", color: "gold", icon: faCoins },
            ],
        },
        {
            id: "security",
            options: [
                { value: "openSource", text: "Open Source", color: "green", icon: faServer },
                { value: "audited", text: "Audited", color: "blue", icon: faUsers },
                { value: "bugBounty", text: "Bug Bounty", color: "gold", icon: faCoins },
                { value: "battleTested", text: "Battle Tested", color: "gold", icon: faCoins },
            ],
        },
        {
            id: "ethereumAligned",
            options: [
                { value: "nonCensoringRelays", text: "Censorship Resistance", color: "green", icon: faServer },
                { value: "permissionlessUsage", text: "Permissionless Usage", color: "blue", icon: faUsers },
                { value: "permissionlessOperators", text: "Permissionless Operators", color: "gold", icon: faCoins },
                { value: "diverseClients", text: "Diverse Clients", color: "gold", icon: faCoins },
            ],
        },
    ]

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
            <MenuOptionGroup defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter}>
                {headerMenuCheckboxValues
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

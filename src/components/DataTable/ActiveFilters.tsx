import { Flex, Text, Box, Button, Tooltip } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import ClearFiltersButton from "./ClearFiltersButton"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ActiveFilters({ dataFilter, setDataFilter }) {
    const DeleteFilterOptionButton = ({ children, index = 0, activeFilter, filterOption = "" }) => {
        const deleteFilterOption = () => {
            let newFilter = dataFilter
            if (activeFilter === "name") {
                delete newFilter["name"]
                setDataFilter({ ...newFilter })
                return
            } else {
                newFilter[activeFilter] = newFilter[activeFilter].filter((option) => option !== filterOption)
                if (newFilter[activeFilter].length === 0) delete newFilter[activeFilter]
                setDataFilter({ ...newFilter })
            }
        }

        return (
            <Button
                key={index}
                variant={"ActiveFilters"}
                border={"1px solid"}
                borderRadius={30}
                px={1}
                mx={1}
                py={0}
                my={"6px"}
                h={8}
                onClick={() => {
                    deleteFilterOption()
                }}
            >
                {children}
                <Box pr={"2px"}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </Box>
            </Button>
        )
    }

    return (
        <Box px={0} pl={5}>
            <Flex gap={2} minH={12} width={"fit-content"} alignItems={"center"} wrap={"wrap"}>
                <Flex color="purple" alignItems={"center"} ml={2} fontWeight={"bold"} fontSize="xl">
                    Active filters
                </Flex>
                {Object.keys(dataFilter).length > 0 ? (
                    Object.keys(dataFilter).map((activeFilter) => {
                        return (
                            <Flex key={activeFilter} className={"bgPageHover"} borderRadius={30} pl={2} pr={1} minH={10} gap={2}>
                                <Flex px={1} alignItems={"center"} fontWeight={"bold"}>
                                    {dataProps.find((obj) => obj.id === activeFilter).name}
                                </Flex>
                                <Flex wrap={"wrap"}>
                                    {Array.isArray(dataFilter[activeFilter]) ? (
                                        <Flex wrap={"wrap"}>
                                            {Object.values(dataFilter[activeFilter]).map((filterOption: string, index) => (
                                                <DeleteFilterOptionButton
                                                    key={index}
                                                    index={index}
                                                    activeFilter={activeFilter}
                                                    filterOption={filterOption}
                                                >
                                                    <Flex
                                                        alignItems={"center"}
                                                        gap={2}
                                                        pr={2}
                                                        pl={1}
                                                        color={
                                                            dataProps.flatMap((d) => d.options).find((opt) => opt?.value === filterOption)?.color ||
                                                            ""
                                                        }
                                                    >
                                                        {providerProperties.find((prop) => prop.value === filterOption)?.name}
                                                    </Flex>
                                                </DeleteFilterOptionButton>
                                            ))}
                                        </Flex>
                                    ) : (
                                        <DeleteFilterOptionButton activeFilter={activeFilter}>
                                            <Box px={2}>{dataFilter[activeFilter]}</Box>
                                        </DeleteFilterOptionButton>
                                    )}
                                </Flex>
                            </Flex>
                        )
                    })
                ) : (
                    <Tooltip
                        placement={"top"}
                        gutter={8}
                        openDelay={300}
                        label={<Box className={"tooltipLabel"}>Filter the table headings to show your active filters here</Box>}
                        className="tooltipArrow"
                        hasArrow={true}
                    >
                        <Flex className={"bgPageHover"} borderRadius={30} px={3} gap={2} minH={10} alignItems={"center"}>
                            <Text>No filters selected</Text>
                            <FontAwesomeIcon icon={faFilter} />
                        </Flex>
                    </Tooltip>
                )}
                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
            </Flex>
        </Box>
    )
}

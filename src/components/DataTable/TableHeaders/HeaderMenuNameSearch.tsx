import React, { useEffect, useState } from "react"
import _ from "lodash"

import { MenuList, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

export default function HeaderMenuNameSearch({ nameInputRef, dataFilter, setDataFilter }) {
    const [searchText, setSearchText] = useState(dataFilter?.name ? dataFilter?.name : "")
    const [debouncedSearchText, setDebouncedSearchText] = useState(searchText)

    useEffect(() => {
        setSearchText(dataFilter?.name || "")
    }, [dataFilter?.name])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchText(searchText)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchText])

    useEffect(() => {
        if (debouncedSearchText === "") {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter.name
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, name: debouncedSearchText })
        }
    }, [debouncedSearchText])

    const handleInputChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <InputGroup borderRadius="lg" pb={1} pl={2} maxW={"200px"} overflow={"hidden"}>
            <Input
                ref={nameInputRef}
                onChange={handleInputChange}
                placeholder="Search names..."
                value={searchText}
                variant={"NameSearchInput"}
                fontWeight={"bold"}
            />
            {searchText && (
                <InputRightElement>
                    <IconButton
                        size={"sm"}
                        pl={"1px"}
                        icon={<FontAwesomeIcon icon={faTimesCircle} size="lg" />}
                        variant="ghost"
                        aria-label="Clear search"
                        borderRadius={"100%"}
                        onClick={() => {
                            setDataFilter(
                                ((newDataFilter) => {
                                    delete newDataFilter.name
                                    return newDataFilter
                                })({ ...dataFilter })
                            )
                            setSearchText("")
                        }}
                    />
                </InputRightElement>
            )}
        </InputGroup>
    )
}

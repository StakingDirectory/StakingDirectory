import React, { useEffect, useState } from "react"
import _ from "lodash"

import { MenuList, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

export default function HeaderMenuNameSearch({ isOpen, nameInputRef, dataFilter, setDataFilter }) {
    // Keep the focus on the input when typing
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }, [isOpen, dataFilter?.name, nameInputRef])

    const [searchText, setSearchText] = useState(dataFilter?.name ? dataFilter?.name : "")

    // Make updateNameFilter debounced
    const debouncedUpdateNameFilter = _.debounce((value) => {
        if (value === "") {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter.name
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, name: value })
        }
    }, 500)

    const handleInputChange = (e) => {
        setSearchText(e.target.value)
        debouncedUpdateNameFilter(e.target.value)
    }

    return (
        <MenuList p={0} overflow={"hidden"}>
            <InputGroup borderRadius="lg">
                <Input ref={nameInputRef} onChange={handleInputChange} border={0} placeholder="Search names..." value={searchText} />
                {searchText && (
                    <InputRightElement>
                        <IconButton
                            icon={<FontAwesomeIcon icon={faTimesCircle} size="sm" />}
                            variant="ghost"
                            aria-label="Clear search"
                            borderRadius={8}
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
        </MenuList>
    )
}

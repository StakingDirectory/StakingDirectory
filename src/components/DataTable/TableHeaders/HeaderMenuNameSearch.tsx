import React, { useEffect } from "react"

import { MenuList, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

export default function HeaderMenuNameSearch({ isOpen, nameInputRef, dataFilter, setDataFilter }) {
    // Keep the focus on the input when typing
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }, [isOpen, dataFilter?.name])

    const updateNameFilter = (e) => {
        if (e.target.value === "") {
            setDataFilter(
                ((newDataFilter) => {
                    delete newDataFilter.name
                    return newDataFilter
                })({ ...dataFilter })
            )
        } else {
            setDataFilter({ ...dataFilter, name: e.target.value })
        }
    }

    return (
        <MenuList p={0} overflow={"hidden"}>
            <InputGroup borderRadius="lg">
                <Input
                    ref={nameInputRef}
                    onChange={updateNameFilter}
                    border={0}
                    placeholder="Search names..."
                    value={dataFilter?.name ? dataFilter?.name : ""}
                />
                {dataFilter?.name && (
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
                            }}
                        />
                    </InputRightElement>
                )}
            </InputGroup>
        </MenuList>
    )
}

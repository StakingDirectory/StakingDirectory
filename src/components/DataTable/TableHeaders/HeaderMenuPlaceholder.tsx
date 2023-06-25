import { MenuList, MenuOptionGroup } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"

export default function HeaderMenuPlaceholder({ id, dataFilter, setDataFilter }) {
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
            <MenuOptionGroup
                key={JSON.stringify(dataFilter[id])}
                defaultValue={dataFilter[id]}
                type="checkbox"
                onChange={updateFilter}
                title={"🏗️ Filtering coming soon! 🏗️"}
                my={5}
            ></MenuOptionGroup>
        </MenuList>
    )
}

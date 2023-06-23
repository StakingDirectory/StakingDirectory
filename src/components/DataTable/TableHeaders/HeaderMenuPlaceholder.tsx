import { MenuList, MenuOptionGroup } from "@chakra-ui/react"

export default function HeaderMenuPlaceholder({ id, dataProps, dataFilter, setDataFilter }) {
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

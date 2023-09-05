import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"
import { lighten, darken } from "polished"

function lightenColor(colorMode, mainColor, value) {
    return colorMode === "dark" ? lighten(value, mainColor) : darken(value, mainColor)
}
function darkenColor(colorMode, mainColor, value) {
    return colorMode === "dark" ? darken(value, mainColor) : lighten(value, mainColor)
}

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            // This is a hack to get the tooltip arrow to work with a custom theme
            // It doesn't seem to accept variables, so I've hardcoded the values here
            ".tooltipArrow": {
                "--popper-arrow-shadow-color": "#54199b",
                [cssVar("popper-arrow-bg").variable]: props.colorMode === "dark" ? "#54199b" : "#EDF2F7",
            },
            ".tooltipLabel": {
                paddingX: "15px",
                paddingY: "10px",

                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderRadius: "7px",
            },
            // Only way I could find to increase the arrow size
            "div .chakra-tooltip__arrow": {
                width: "130% !important",
                height: "130% !important",
            },
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
            ".bgPageHover": {
                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
            },
            ".bgContent": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
            },
            ".borderColor": {
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
            },
            ".borderColorDivider": {
                borderColor: props.colorMode === "dark" ? "divider.dark" : "divider.light",
            },
            ".checklistBarBorder": {
                borderColor: props.colorMode === "dark" ? "checklistBar.dark" : "checklistBar.light",
            },
            ".checklistBarBackground": { bg: "purple" },
            ".checklistBarBackgroundTransparent": { bg: "purpleTransparent" },
            ".expandedTableRow": {
                _hover: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                },
            },
            ".devTableRow": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                _hover: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                },
            },
            ".checklistList": {
                _hover: {
                    bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                },
            },
            ".checklistListOpen": {
                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
            },
            ".expandContentBox": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                borderWidth: "3px",
                padding: "1rem",
                borderRadius: "20px",
            },
            ".expandContentBoxSmall": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                borderWidth: "3px",
                paddingX: "0.5rem",
                paddingY: "15px",
                borderRadius: "20px",
            },
            ".editorOptionContainer": {
                paddingTop: "0.6rem",
                paddingBottom: "1rem",
                paddingX: "1rem",
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                borderRadius: "15px",
                borderWidth: "3px",
                marginTop: "1rem",
            },
            ".editedLozenge": {
                bg: "orange",
                paddingX: "0.5rem",
                paddingY: "0.2rem",
                borderRadius: "10px",
                color: "white",
                fontWeight: "bold",
            },
            ".ToastBaseStyle": {
                marginTop: "12px",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "bold",
            },
            ".ToastWarning": {
                bg: "orange",
                color: props.colorMode === "dark" ? "text.light" : "text.dark",
            },
            ".ToastError": {
                bg: "red",
                color: props.colorMode === "dark" ? "text.light" : "text.dark",
            },
            ".ToastSuccess": {
                bg: "green",
                color: props.colorMode === "dark" ? "text.light" : "text.dark",
            },
            ".CommunityUpdatePhase": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderColor: "blue",
                borderWidth: "3px",
                borderRadius: "10px",
            },
            ".CommunityUpdatePhaseHeader": {
                _hover: {
                    bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                },
            },
            ".EditorInputLeftAddon": {
                bg: props.colorMode === "dark" ? "border.dark !important" : "pageBackgroundHover.light !important",
            },
            ".NoResultsBox": {
                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                borderWidth: "3px",
                borderRadius: "20px",
            },
            ".pageBackgroundInverted": {
                bg: props.colorMode === "dark" ? "pageBackground.light" : "pageBackground.dark",
            },
        }),
    },
    components: {
        Tabs: {
            baseStyle: (props: StyleFunctionProps) => ({
                tab: {
                    _selected: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackground.light",
                    },
                },
            }),
        },
        Code: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "contentBackground.light",
            }),
        },
        Input: {
            variants: {
                EditorInput: (props: StyleFunctionProps) => ({
                    field: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackground.light",
                        borderRadius: "10px",
                        borderLeftRadius: "0",
                        _focus: {
                            borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                            borderWidth: "2px",
                            marginLeft: "-2px",
                        },
                    },
                }),
                NameSearchInput: (props: StyleFunctionProps) => ({
                    field: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackground.light",
                        borderRadius: "10px",
                        _focus: {
                            borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                            borderWidth: "3px",
                            marginLeft: "-3px",
                        },
                    },
                }),
            },
        },
        Textarea: {
            variants: {
                EditorTextarea: (props: StyleFunctionProps) => ({
                    bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackground.light",
                    borderRadius: "10px",
                    _focus: {
                        borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                        borderWidth: "2px",
                        marginLeft: "-2px",
                        marginTop: "-2px",
                        marginBottom: "2px",
                    },
                }),
            },
        },
        Button: {
            variants: {
                MainFilterButton: (props: StyleFunctionProps) => ({
                    borderWidth: "5px",
                    borderRadius: "20px",
                    borderColor: "border.dark",
                    paddingX: "1rem",
                    paddingY: "0.8rem",
                    whiteSpace: "normal",
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                    _active: {
                        bg: props.colorMode === "dark" ? "rgba(255, 255, 255, 0.15)" : "pageBackground.light",
                    },
                }),
                ShowMoreButton: (props: StyleFunctionProps) => ({
                    bg: darkenColor(props.colorMode, props.theme.colors.pageBackgroundHover.dark, 0.03),
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                }),
                ActiveFilters: (props: StyleFunctionProps) => ({
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    },
                }),
                EditorSelector: (props: StyleFunctionProps) => ({
                    background: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackground.light",
                    borderRadius: "10px",
                    _hover: {
                        bg: props.colorMode === "dark" ? "rgba(255, 255, 255, 0.15)" : "pageBackground.light",
                    },
                    _active: {
                        bg: props.colorMode === "dark" ? "rgba(255, 255, 255, 0.25)" : "pageBackground.light",
                    },
                }),
                EditorSubmit: (props: StyleFunctionProps) => {
                    const mainColor = props.theme.colors.purple
                    return {
                        background: props.colorMode === "dark" ? mainColor : "pageBackground.light",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        _hover: {
                            bg: lightenColor(props.colorMode, mainColor, 0.1),
                        },
                        _active: {
                            bg: darkenColor(props.colorMode, mainColor, 0.1),
                        },
                        "&[disabled]:hover": {
                            _hover: {
                                bg: mainColor,
                            },
                        },
                    }
                },
                EditorCancel: (props: StyleFunctionProps) => {
                    const mainColor = props.theme.colors.red
                    return {
                        borderColor: props.colorMode === "dark" ? mainColor : "pageBackground.light",
                        borderWidth: "3px",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        _hover: {
                            bg: darkenColor(props.colorMode, mainColor, 0.2),
                        },
                        _active: {
                            bg: darkenColor(props.colorMode, mainColor, 0.1),
                        },
                    }
                },
                AddNewProvider: (props: StyleFunctionProps) => {
                    const mainColor = props.theme.colors.green
                    return {
                        borderColor: props.colorMode === "dark" ? mainColor : "pageBackground.light",
                        borderWidth: "3px",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        bg: darkenColor(props.colorMode, mainColor, 0.2),
                        _hover: {
                            bg: darkenColor(props.colorMode, mainColor, 0.15),
                        },
                        _active: {
                            bg: darkenColor(props.colorMode, mainColor, 0.1),
                        },
                    }
                },
            },
        },
        Table: {
            variants: {
                DataTable: (props: StyleFunctionProps) => ({
                    thead: {
                        tr: {
                            borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                        },
                    },
                    th: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                        paddingTop: "1rem",
                        paddingLeft: "0rem",
                        paddingRight: "0rem",
                        paddingBottom: "0",
                        verticalAlign: "bottom",
                        textAlign: "center",
                    },
                    tbody: {
                        tr: {
                            borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                            _hover: {
                                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                            },
                            td: {
                                borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                                paddingX: "0.5rem",
                                paddingY: "0",
                            },
                        },
                    },
                }),
            },
        },
        Tooltip: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                color: props.colorMode === "dark" ? "text.dark" : "text.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                maxWidth: "100%",
                textAlign: "center",
                borderWidth: "3px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "sm",
                padding: "0",
                boxShadow: "0 0 20px 0 rgba(0, 0, 0, 1)",
                // This is a hack to get the tooltip arrow to work with a custom theme
                // and this hides the default arrow theme
                [cssVar("popper-arrow-bg").variable]: "",
            }),
        },
        Popover: {
            baseStyle: (props: StyleFunctionProps) => ({
                content: {
                    bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                    color: props.colorMode === "dark" ? "text.dark" : "text.light",
                    borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                    maxWidth: "100%",
                    borderWidth: "3px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "sm",
                    padding: "10px",
                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 1)",
                    textTransform: "none",
                    // whitespace: "normal",
                },
            }),
        },
        Menu: {
            baseStyle: (props: StyleFunctionProps) => ({
                list: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                    borderRadius: "10px",
                    overflow: "hidden",
                    paddingTop: "0",
                    paddingBottom: "0",
                    borderWidth: "3px",
                },
                item: {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                    focus: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                },
                groupTitle: {
                    textAlign: "left",
                    marginLeft: "0.8rem",
                },
            }),
            variants: {
                DataTableOption: (props: StyleFunctionProps) => ({
                    button: {
                        transition: "none",
                        // TODO: After launch add hover back
                        // _hover: {
                        border: "3px solid",
                        borderColor: darkenColor(props.colorMode, props.theme.colors.border.dark, 0.05),
                        // },
                    },
                }),
                DataTableHeader: (props: StyleFunctionProps) => ({
                    button: {
                        padding: "10px",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        _hover: {
                            bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                        },
                    },
                }),
            },
        },
        Modal: {
            baseStyle: (props: StyleFunctionProps) => ({
                dialog: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    borderColor: darkenColor(props.colorMode, props.theme.colors.border.dark, 0.15),

                    borderRadius: "15px",
                    borderWidth: "3px",
                },
                overlay: {
                    backdropFilter: "blur(3px)",
                },
                header: {
                    borderBottomWidth: "3px",
                    borderColor: darkenColor(props.colorMode, props.theme.colors.border.dark, 0.15),
                },
                footer: {
                    borderTopWidth: "3px",
                    borderColor: darkenColor(props.colorMode, props.theme.colors.border.dark, 0.15),
                },
            }),
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#0f0536",
        },
        pageBackgroundHover: {
            light: "#EDF2F7",
            dark: "#2a114c",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#0e052c",
        },
        border: {
            light: "#D3D3D3",
            dark: "#54199b",
        },
        checklistBar: {
            light: "#dfdfdf",
            dark: "#0c081b",
        },
        tableBorder: {
            light: "#EDF2F7",
            dark: "rgb(255, 255, 255, 0.2)",
        },
        divider: {
            light: "#dfdfdf",
            dark: "rgb(255, 255, 255, 0.2)",
        },
        gold: "#e7c60d",
        red: "#EC420C",
        green: "#289e33",
        blue: "#0da6d8",
        pink: "#b124b1",
        purple: "#54199b",
        orange: "#d66b13",
        purpleTransparent: "rgba(83, 25, 155, 0.3)",
    },
})

export default customTheme

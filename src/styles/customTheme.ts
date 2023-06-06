import { extendTheme } from "@chakra-ui/react"

const customTheme = extendTheme({
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#1B1B1B",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#272A2F",
        },
        border: {
            light: "#D3D3D3",
            dark: "#333333",
        },
        divider: {
            light: "#dfdfdf",
            dark: "#565656",
        },
    },
})

export default customTheme

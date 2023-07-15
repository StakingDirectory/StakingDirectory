import {
    faCoins,
    faUsers,
    faServer,
    faCode,
    faUserAstronaut,
    faBuilding,
    faMagnifyingGlass,
    faBookOpen,
    faBug,
    faVolumeHigh,
    faShapes,
    faLockOpen,
    faListUl,
    faShoppingBasket,
    faHardDrive,
} from "@fortawesome/free-solid-svg-icons"

const dataProps = [
    {
        id: "providerProperties",
        providerProperties: [
            { value: "name", name: "Name" },
            { value: "stakeFromHome", name: "Yes!" },
            { value: "stakingType", name: "Staking type" },
            { value: "providerType", name: "Provider type" },
            { value: "reward", name: "Reward" },
            { value: "fee", name: "Fee" },
            { value: "links", name: "Links" },
            { value: "minStake", name: "Min stake" },
            { value: "validatorKey", name: "Validator Key" },
            { value: "withdrawalKey", name: "Withdrawal Key" },
            { value: "openSource", name: "Open source" },
            { value: "audited", name: "Audited" },
            { value: "bugBounty", name: "Bug bounty" },
            { value: "permissionlessUsage", name: "Permissionless usage" },
            { value: "permissionlessOperators", name: "Permissionless operators" },
            { value: "nonCensoringRelays", name: "Censorship resistant relays" },
            { value: "diverseExecutionClients", name: "Diverse execution clients" },
            { value: "diverseBeaconClients", name: "Diverse beacon clients" },
            { value: "solo", name: "Solo" },
            { value: "pooled", name: "Pooled" },
            { value: "managed", name: "Managed" },
            { value: "lst", name: "LST" },
            { value: "indexToken", name: "LST index" },
            { value: "hardware", name: "Hardware" },
            { value: "software", name: "Software" },
            { value: "saas", name: "SAAS" },
            { value: "userValidator", name: "User controlled" },
            { value: "service", name: "Service" },
            { value: "nodeOperator", name: "Node operator" },
            { value: "userWithdrawal", name: "User controlled" },
            { value: "smartContract", name: "Smart contract" },
            { value: "status", name: "Status" },
            { value: "dev", name: "In development" },
            { value: "active", name: "Active" },
            { value: "description", name: "Description" },
            { value: "mainnetLaunch", name: "Mainnet Launch" },
            { value: "no", name: "No" },
            { value: "other", name: "Other" },
            { value: "percentage", name: "Percentage" },
            { value: "eth", name: "ETH" },
            { value: "anyAmount", name: "Any Amount" },
        ],
    },
    {
        id: "checklistProperties",
        checklistProperties: [
            {
                value: "openSource",
                description: {
                    true: "Essential code is 100% open source and available to the public to fork and use.",
                    false: "Essential code is closed source.",
                },
            },
            {
                value: "audited",
                description: {
                    true: "Essential code has undergone formal auditing with results published and available publicly.",
                    false: "No audits have been conducted.",
                },
            },
            {
                value: "bugBounty",
                description: {
                    true: "A public bug bounty is active on any essential code to reward users for safely reporting and/or fixing vulnerabilities.",
                    false: "No public bug bounty is available.",
                },
            },
            {
                value: "permissionlessUsage",
                description: {
                    true: "Users do not require any special permission to use the software or service.",
                    false: "Users can only use this service if permission is granted by the software or service provider.",
                },
            },
            {
                value: "permissionlessOperators",
                description: {
                    true: "Users do not require any special permission to operate a validator using the software or service.",
                    false: "Users can only operate a validator if permission is granted by the software or service provider.",
                },
            },
            {
                value: "nonCensoringRelays",
                description: {
                    true: "The software or service uses at least one non-censoring MEV relay.",
                    false: "The software or service only uses censoring MEV relays.",
                },
            },
            {
                value: "diverseExecutionClients",
                description: {
                    true: "No single execution client is used by 2/3 or more validators and multiple clients are available to use.",
                    false: "A single execution client is used by more than 2/3 validators and/or multiple clients are not supported.",
                },
            },
            {
                value: "diverseBeaconClients",
                description: {
                    true: "Multiple beacon clients are supported.",
                    false: "Only majority beacon clients are supported.",
                },
            },
        ],
    },
    {
        id: "keyOwnerProperties",
        keyOwnerProperties: [
            {
                value: "userValidator",
                description: "The user who created the validator has a copy of the validator key.",
            },
            {
                value: "service",
                description: "The service provider has a copy of the validator key.",
            },
            {
                value: "nodeOperator",
                description: "The node operator has a copy of the validator key.",
            },
            {
                value: "userWithdrawal",
                description: "The withdrawal key is directly controlled by the user.",
            },
            {
                value: "smartContract",
                description: "The withdrawal key is controlled by a smart contract.",
            },
        ],
    },
    {
        isTableHeader: true,
        type: "text",
        id: "name",
        name: "Name",
        headerText: "NAME",
    },
    {
        isTableHeader: true,
        type: "checkbox",
        id: "stakeFromHome",
        name: "Stake from home",
        headerText: "STAKE FROM <br /> HOME",
        options: [{ value: "stakeFromHome", color: "", icon: faServer }],
    },
    {
        isTableHeader: true,
        type: "checkboxType",
        id: "stakingType",
        name: "Staking Type",
        headerText: "STAKING <br /> TYPE",
        options: [
            {
                value: "solo",
                color: "green",
                description:
                    'Solo staking is the "gold standard" - the act of staking your Ethereum on nodes that you are running yourself (ideally from home), while retaining full custody of your ETH. Validators in this category are fully funded by yourself.',
                icon: faServer,
            },
            {
                value: "pooled",
                color: "blue",
                description:
                    "Pooled staking is when multiple stakeholders combine their resources to create a validator. By pooling resources, individuals who do not have the 32 ETH required for solo staking can still participate in the staking process.",
                icon: faUsers,
            },
            {
                value: "managed",
                color: "red",
                description: "Managed staking is where a third party manages the staking process on behalf of stakeholders.",
                icon: faUsers,
            },
            {
                value: "lst",
                color: "gold",
                description:
                    "Liquid Staking Tokens (LST) represent staked ETH and its rewards in a tokenized form. This provides liquidity to stakeholders as they can use these tokens to trade, as collateral, or in DeFi applications while still earning staking rewards.",
                icon: faCoins,
            },
            {
                value: "indexToken",
                color: "orange",
                description:
                    "Index Tokens represent a diversified portfolio of staking tokens, allowing users to stake across multiple staking protocols with a single token.",
                icon: faShoppingBasket,
            },
        ],
    },
    {
        isTableHeader: false,
        type: "checkboxType",
        id: "providerType",
        name: "Provider Type",
        headerText: "PROVIDER <br /> TYPE",
        options: [
            { value: "Hardware", color: "", icon: faHardDrive },
            { value: "No", color: "", icon: faHardDrive },
        ],
    },
    {
        isTableHeader: true,
        type: "other",
        id: "reward",
        name: "Reward",
        headerText: "REWARD",
        options: [],
    },
    {
        isTableHeader: true,
        type: "other",
        id: "fee",
        name: "Fee",
        headerText: "FEE",
        options: [],
    },
    {
        isTableHeader: true,
        type: "other",
        id: "minStake",
        name: "Min Stake",
        headerText: "MIN STAKE",
        options: [],
    },
    {
        isTableHeader: false,
        type: "checkboxKeyOwner",
        id: "validatorKey",
        name: "Validator Key",
        headerText: "KEY <br /> OWNER",
        options: [
            { value: "userValidator", color: "green", icon: faUserAstronaut },
            { value: "service", color: "gold", icon: faBuilding },
            { value: "nodeOperator", color: "blue", icon: faServer },
        ],
    },
    {
        isTableHeader: false,
        id: "withdrawalKey",
        name: "Withdrawal Key",
        headerText: "",
        options: [
            { value: "userWithdrawal", color: "green", icon: faUserAstronaut },
            { value: "smartContract", color: "blue", icon: faCode },
        ],
    },
    {
        isTableHeader: true,
        type: "checkbox",
        id: "checklist",
        name: "Checklist",
        headerText: "CHECKLIST",
        options: [
            { value: "openSource", color: "", icon: faBookOpen },
            { value: "bugBounty", color: "", icon: faBug },
            { value: "audited", color: "", icon: faMagnifyingGlass },
            { value: "nonCensoringRelays", color: "", icon: faVolumeHigh },
            { value: "diverseExecutionClients", color: "", icon: faShapes },
            { value: "diverseBeaconClients", color: "", icon: faListUl },
            { value: "permissionlessOperators", color: "", icon: faLockOpen },
            { value: "permissionlessUsage", color: "", icon: faUsers },
        ],
    },
]

export default dataProps

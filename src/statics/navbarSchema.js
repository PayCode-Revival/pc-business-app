export const navbarSchema = [{
        title: "Dashboard",
        iconName: "dashboard",
    },
    {
        title: "Wallet",
        iconName: "wallet",
        children: [{
                pathName: "top-up",
                title: "Top Up"
            },
            {
                pathName: "withdraw",
                title: "Withdraw"
            },
            {
                pathName: "transfer",
                title: "Transfer"
            },
        ],
    },
    {
        title: "Accounts",
        iconName: "account_balance",
        children: [{
                pathName: "add",
                title: "Add"
            },
            {
                pathName: "manage",
                title: "Manage"
            }
        ],
    },
    {
        title: "Payments",
        iconName: "payments",
        children: [{
                pathName: "add-category",
                title: "Add Category"
            },
            {
                pathName: "manage-categories",
                title: "Manage Categories"
            }
        ],
    },
    {
        title: "Reports",
        iconName: "pie_chart",
        children: [{
                pathName: "summaries",
                title: "Summaries"
            },
            {
                pathName: "demographapics",
                title: "Demographics"
            },
            {
                pathName: "print",
                title: "Print"
            },
        ],
    },
    {
        title: "Users",
        iconName: "admin_panel_settings",
        children: [{
                pathName: "add",
                title: "Add"
            },
            {
                pathName: "manage",
                title: "Manage"
            }
        ],
    },
    {
        title: "Settings",
        iconName: "settings",
    },
    {
        title: "Help",
        iconName: "help_center"
    }
]
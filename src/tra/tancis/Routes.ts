export const TancisRoutes = [
    {
        name: "Cargo",
        base: process.env.REACT_APP_BASE,
        children: [
            {
                name: "Cargo Management",
                base: "",
                children: [
                    {
                        name: "Manifest Management",
                        base: "",
                        children: [
                            {
                                name: "Repacking BL",
                                base: "/wrhs/rpck",
                                children: [
                                    {
                                        name: "Repacking BL (with Item)",
                                        to: "/cgme0411001q",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "Enforce Management",
                base: "",
            },
        ],
    },
];

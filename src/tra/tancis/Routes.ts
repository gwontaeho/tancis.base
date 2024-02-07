export const TancisRoutes = [
    {
        name: "Cargo Management",
        base: process.env.REACT_APP_BASE_CGM,
        children: [
            {
                name: "Manifest Management",
                base: "CGM02",
                children: [
                    {
                        name: "Repacking BL",
                        base: "CGM02S12",
                        children: [
                            {
                                name: "Repacking BL (with Item)",
                                to: "/cgme/wrhs/rpck/cgme0411001q",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

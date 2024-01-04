export const TancisRoutes = [
    {
        /*
         * name : 메뉴 명
         * base : 기본 경로
         * to : 메뉴의 경로 (base + to로 주소 조합)
         * children : 하위 경로 Array
         */
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

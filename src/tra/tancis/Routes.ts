/**
 * - top navigation
 * list : depth 1
 * item : depth 2
 *
 *
 * top navigation의 2 depth 클릭 시
 * side navigation render (depth 3)
 *
 *
 * - side(vertical) navigation
 * list : depth 3
 * item : depth 4 ~
 *
 */

export const TancisRoutes = [
    {
        name: "Cargo Management",
        base: process.env.REACT_APP_BASE_CGM,
        children: [
            {
                name: "Arrival/Departure Report",
                // base 입력해주세요
                base: "/temp",
                children: [
                    {
                        name: "Vessel Arrival Report",
                        base: "/arvl",
                        children: [
                            {
                                name: "Vessel Arrival Report List",
                                to: "/efme0201001q",
                            },
                        ],
                    },
                    {
                        name: "Vessel Departure Report",
                        base: "/dptr",
                        children: [
                            {
                                name: "Vessel Departure Report List",
                                to: "/efme0202001q",
                            },
                        ],
                    },
                    {
                        name: "Aircraft Arrival Report",
                        base: "/arvl",
                        children: [
                            {
                                name: "Aircraft Arrival Report List",
                                to: "/efme0203001q",
                            },
                        ],
                    },
                    {
                        name: "Aircraft Departure Report",
                        base: "/dptr",
                        children: [
                            {
                                name: "Aircraft Departure Report List",
                                to: "/efme0204001q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Manifest Management",
                base: "",
                children: [
                    {
                        name: "Sea Import Manifest",
                        base: "/imp",
                        children: [
                            {
                                name: "Manifest",
                                to: "/aaaaa/ssss/cgme0101001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/bbb/ddd/cgme0101008q",
                            },
                            {
                                name: "Manifest Amendment",
                                to: "/cgme0101013s",
                            },
                            {
                                name: "Manifest Information",
                                to: "/cgme0101025q",
                            },
                            {
                                name: "Change Delivery Place",
                                to: "/cgme0409001q",
                            },
                        ],
                    },
                    {
                        name: "Sea Export Manifest",
                        base: "/exp",
                        children: [
                            {
                                name: "Manifest",
                                to: "/cgme0105001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/cgme0105012q",
                            },
                        ],
                    },
                    {
                        name: "Air Import Manifest",
                        base: "/imp",
                        children: [
                            {
                                name: "Master Manifest",
                                to: "/cgme0102001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/cgme0102006q",
                            },
                            {
                                name: "Manifest Amendment",
                                to: "/cgme0102011q",
                            },
                        ],
                    },
                    {
                        name: "Air Export Manifest",
                        base: "/exp",
                        children: [
                            {
                                name: "Master Manifest",
                                to: "/cgme0106001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/cgme0106011q",
                            },
                        ],
                    },
                    {
                        name: "Road Import Manifest",
                        base: "/imp",
                        children: [
                            {
                                name: "Road Consignment Note",
                                to: "/cgme0104001q",
                            },
                            {
                                name: "Road Consignment Note Amendment",
                                to: "/cgme0104003s",
                            },
                            {
                                name: "Road Consignment Note Cancellation",
                                to: "/cgme0104009q",
                            },
                        ],
                    },
                    {
                        name: "Road Export Manifest",
                        base: "/exp",
                        children: [
                            {
                                name: "Road Consignment Note",
                                to: "/cgme0108001q",
                            },
                        ],
                    },
                    {
                        name: "Train Import Manifest",
                        base: "/imp",
                        children: [
                            {
                                name: "Manifest",
                                to: "/cgme0103001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/cgme0103006q",
                            },
                            {
                                name: "Manifest Amendment",
                                to: "/cgme0103011q",
                            },
                        ],
                    },
                    {
                        name: "Train Export Manifest",
                        base: "/exp",
                        children: [
                            {
                                name: "Manifest",
                                to: "/cgme0107001q",
                            },
                            {
                                name: "House Manifest",
                                to: "/cgme0107011q",
                            },
                        ],
                    },
                    {
                        name: "Sea Import Operation Schedule",
                        base: "/imp",
                        children: [
                            {
                                name: "Operation Schedule",
                                to: "/cgme0101031s",
                            },
                        ],
                    },
                    {
                        name: "Air Import Operation Schedule",
                        base: "/imp",
                        children: [
                            {
                                name: "Operation Schedule",
                                to: "/cgme0102020s",
                            },
                        ],
                    },
                    {
                        name: "F89 Application",
                        base: "/f89",
                        children: [
                            {
                                name: "F89 Application Submission",
                                to: "/cgme0110001q",
                            },
                            {
                                name: "F89 Application Amendment",
                                to: "/cgme0110004q",
                            },
                            {
                                name: "F89 Application Cancellation",
                                to: "/cgme0110007q",
                            },
                        ],
                    },
                    {
                        name: "Repacking BL",
                        base: "/wrhs/rpck",
                        children: [
                            {
                                name: "Repacking BL (with Item)",
                                to: "/cgme0411001q",
                            },
                            {
                                name: "Repacking BL (with BL)",
                                to: "/cgme0411004q",
                            },
                            {
                                name: "Repacking BL Amendment (with Item)",
                                to: "/cgme0411009q",
                            },
                            {
                                name: "Repacking BL Amendment (with BL)",
                                to: "/cgme0411013q",
                            },
                            {
                                name: "Repacking BL Cancellation (with Item)",
                                to: "/cgme0411017q",
                            },
                            {
                                name: "Repacking BL Cancellation (with BL)",
                                to: "/cgme0411020q",
                            },
                        ],
                    },
                    {
                        name: "Dummy BL",
                        base: "/dmy",
                        children: [
                            {
                                name: "Dummy BL",
                                to: "/cgme0111001q",
                            },
                            {
                                name: "Dummy BL Cancellation",
                                to: "/cgme0111003q",
                            },
                        ],
                    },
                    {
                        name: "Post Parcel ",
                        base: "/post",
                        children: [
                            {
                                name: "Sort Report",
                                to: "/cgme0112001q",
                            },
                            {
                                name: "HBL Sort Report",
                                to: "/cgme0112004q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Discharge & Loading",
                base: "",
                children: [
                    {
                        name: "Sea Discharge",
                        base: "/dscg/dcla",
                        children: [
                            {
                                name: "Discharge Declaration",
                                to: "/cgme0201001q",
                            },
                            {
                                name: "Discharge List",
                                to: "/cgme0201007q",
                            },
                            {
                                name: "Short/Overlanded Report",
                                to: "/cgme0201009q",
                            },
                            {
                                name: "Short/Overlanded Report Amendment",
                                to: "/cgme0201014q",
                            },
                            {
                                name: "Short/Overlanded Report (OnBoard)",
                                to: "/cgme0201016q",
                            },
                            {
                                name: "Short/Overlanded Report Amendment (OnBoard)",
                                to: "/cgme0201019q",
                            },
                        ],
                    },
                    {
                        name: "Sea Loading",
                        base: "/load/dcla",
                        children: [
                            {
                                name: "Vessel Operation",
                                to: "/cgme0205001q",
                            },
                            {
                                name: "Vessel Operation Amendment",
                                to: "/cgme0205003q",
                            },
                            {
                                name: "Loading Declaration",
                                to: "/cgme0205006q",
                            },
                            {
                                name: "Loading Declaration Amendment",
                                to: "/cgme0205016q",
                            },
                            {
                                name: "Loading Declaration Cancellation",
                                to: "/cgme0205026q",
                            },
                            {
                                name: "House Loading",
                                to: "/cgme0205029q",
                            },
                            {
                                name: "Loading List",
                                to: "/cgme0205034q",
                            },
                            {
                                name: "Loading Result Report",
                                to: "/cgme0205036q",
                            },
                            {
                                name: "Loading Result Report Amendment",
                                to: "/cgme0205053q",
                            },
                            {
                                name: "Loading Result Report Cancellation",
                                to: "/cgme0205056q",
                            },
                            {
                                name: "Unloaded List",
                                to: "/cgme0205043q",
                            },
                            {
                                name: "Export Cargo Change Application",
                                to: "/cgme0205045s",
                            },
                            {
                                name: "Export Loading Status",
                                to: "/cgme0205048q",
                            },
                            {
                                name: "Unloaded List for Other Vessels",
                                to: "/cgme0205049q",
                            },
                        ],
                    },
                    {
                        name: "Air Discharge",
                        base: "/dscg/dcla",
                        children: [
                            {
                                name: "Discharge List",
                                to: "/cgme0202001q",
                            },
                            {
                                name: "Short/Overlanded Report",
                                to: "/cgme0202003q",
                            },
                            {
                                name: "Short/Overlanded Report Amendment",
                                to: "/cgme0202006q",
                            },
                            {
                                name: "Partial Arrival Status",
                                to: "/cgme0202008q",
                            },
                        ],
                    },
                    {
                        name: "Air Loading",
                        base: "/load/dcla",
                        children: [
                            {
                                name: "Aircraft Operation",
                                to: "/cgme0206001q",
                            },
                            {
                                name: "Aircraft Operation Amendment",
                                to: "/cgme0206003q",
                            },
                            {
                                name: "Loading Declaration",
                                to: "/cgme0206006q",
                            },
                            {
                                name: "Loading Declaration Amendment",
                                to: "/cgme0206014q",
                            },
                            {
                                name: "Loading Declaration Cancellation",
                                to: "/cgme0206021q",
                            },
                            {
                                name: "House Loading",
                                to: "/cgme0206024q",
                            },
                            {
                                name: "Loading List",
                                to: "/cgme0206029q",
                            },
                            {
                                name: "Short/Overloaded Report",
                                to: "/cgme0206031q",
                            },
                            {
                                name: "Short/Over Loaded Report Amendment",
                                to: "/cgme0206044q",
                            },
                            {
                                name: "Short/Over Loaded Report Cancellation",
                                to: "/cgme0206047q",
                            },
                            {
                                name: "Unloaded List",
                                to: "/cgme0206036q",
                            },
                            {
                                name: "Export Cargo Change Application",
                                to: "/cgme0206038s",
                            },
                            {
                                name: "Export Loading Status",
                                to: "/cgme0206040q",
                            },
                            {
                                name: "Unloaded List for Other Aircraft",
                                to: "/cgme0206050q",
                            },
                        ],
                    },
                    {
                        name: "Train Discharge",
                        base: "/dscg/dcla",
                        children: [
                            {
                                name: "Discharge List",
                                to: "/cgme0203001q",
                            },
                            {
                                name: "Short/Overlanded Report",
                                to: "/cgme0203003q",
                            },
                            {
                                name: "Short/Overlanded Report Amendment",
                                to: "/cgme0203006q",
                            },
                        ],
                    },
                    {
                        name: "Train Loading",
                        base: "/load/dcla",
                        children: [
                            {
                                name: "Train Operation",
                                to: "/cgme0207001q",
                            },
                            {
                                name: "Train Operation Amendment",
                                to: "/cgme0207003q",
                            },
                            {
                                name: "Loading Declaration",
                                to: "/cgme0207006q",
                            },
                            {
                                name: "Loading Declaration Amendment",
                                to: "/cgme0207016q",
                            },
                            {
                                name: "Loading Declaration Cancellation",
                                to: "/cgme0207025q",
                            },
                            {
                                name: "House Loading",
                                to: "/cgme0207028q",
                            },
                            {
                                name: "Loading List",
                                to: "/cgme0207033q",
                            },
                            {
                                name: "Loading Result Report",
                                to: "/cgme0207035q",
                            },
                            {
                                name: "Loading Result Report Amendment",
                                to: "/cgme0207050q",
                            },
                            {
                                name: "Loading Result Report Cancellation",
                                to: "/cgme0207053q",
                            },
                            {
                                name: "Unloaded List",
                                to: "/cgme0207042q",
                            },
                            {
                                name: "Export Cargo Change Application",
                                to: "/cgme0207044s",
                            },
                            {
                                name: "Export Loading Status",
                                to: "/cgme0207047q",
                            },
                        ],
                    },
                    {
                        name: "Stuffing",
                        base: "/stfn",
                        children: [
                            {
                                name: "Dummy Stuffing Report",
                                to: "/cgme0209001q",
                            },
                            {
                                name: "Dummy Stuffing Report Amendment",
                                to: "/cgme0209004q",
                            },
                            {
                                name: "Stuffing Report",
                                to: "/cgme0209007q",
                            },
                            {
                                name: "Stuffing Report Amendment",
                                to: "/cgme0209010q",
                            },
                            {
                                name: "Re-stuffing Report",
                                to: "/cgme0209013q",
                            },
                        ],
                    },
                    {
                        name: "Terminal Report",
                        base: "/dscg/rpt",
                        children: [
                            {
                                name: "Sea Terminal Report",
                                to: "/cgme0201021q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Transfer",
                base: "",
                children: [
                    {
                        name: "ICD Transfer",
                        base: "/trsf/icd/xptd",
                        children: [
                            {
                                name: "Expected ICD Transfer List",
                                to: "/cgme0301001q",
                            },
                            {
                                name: "ICD Transfer Declaration List",
                                to: "/cgme0301002q",
                            },
                            {
                                name: "ICD Transfer Declaration Amendment List",
                                to: "/cgme0301011q",
                            },
                            {
                                name: "ICD Transfer Cancellation List",
                                to: "/cgme0301021q",
                            },
                        ],
                    },
                    {
                        name: "Transit",
                        base: "/trsf/bt/dcla",
                        children: [
                            {
                                name: "Bonded Transportation List",
                                to: "/cgme0303001q",
                            },
                            {
                                name: "Expected Carry-In List",
                                to: "/cgme0303011q",
                            },
                            {
                                name: "BT Declaration Amendment List",
                                to: "/cgme0303021q",
                            },
                            {
                                name: "BT Vehicle Assignment List",
                                to: "/cgme0303031q",
                            },
                            {
                                name: "BT Multimodal Declaration List",
                                to: "/cgme0303041q",
                            },
                            {
                                name: "BT Multimodal Declaration Amendment List",
                                to: "/cgme0303061q",
                            },
                            {
                                name: "Bonded Transportation View",
                                to: "/cgme0303051q",
                            },
                        ],
                    },
                    {
                        name: "Simple Transfer Declaration",
                        base: "/trsf/simpl/gnrl",
                        children: [
                            {
                                name: "Simple Transfer Declaration List",
                                to: "/cgme0302001q",
                            },
                            {
                                name: "Simple Transfer Declaration Amendment List",
                                to: "/cgme0302011q",
                            },
                            {
                                name: "Simple Transfer Cancellation List",
                                to: "/cgme0302021q",
                            },
                        ],
                    },
                    {
                        name: "Simple Transfer Declaration (Post)",
                        base: "/trsf/simpl/post",
                        children: [
                            {
                                name: "Simple Transfer Declaration List (Post)",
                                to: "/cgme0302051q",
                            },
                            {
                                name: "Simple Transfer Declaration Amendment List (Post)",
                                to: "/cgme0302061q",
                            },
                            {
                                name: "Simple Transfer Cancellation List (Post)",
                                to: "/cgme0302071q",
                            },
                        ],
                    },
                    {
                        name: "MRA Information",
                        base: "/trsf/bt/othr",
                        children: [
                            {
                                name: "MRA Transit List",
                                to: "/cgme0901001q",
                            },
                            {
                                name: "MRA Export List",
                                to: "/cgme0901003q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Warehouse",
                base: "",
                children: [
                    {
                        name: "Warehouse In/Out",
                        base: "/wrhs/cri",
                        children: [
                            {
                                name: "Carry-In",
                                to: "/cgme0401001q",
                            },
                            {
                                name: "Carry-Out",
                                to: "/cgme0401008q",
                            },
                            {
                                name: "Carry-In (Post)",
                                to: "/cgme0401011q",
                            },
                            {
                                name: "Carry-Out (Post)",
                                to: "/cgme0401015q",
                            },
                        ],
                    },
                    {
                        name: "Inventory",
                        base: "/bw/stck",
                        children: [
                            {
                                name: "Warehouse Inventory List ",
                                to: "/cgme0403001q",
                            },
                            {
                                name: "Bonded Warehouse Inventory List (by Item)",
                                to: "/cgme0403004q",
                            },
                            {
                                name: "Bonded Warehouse Overstayed Inventory List",
                                to: "/cgme0403005q",
                            },
                        ],
                    },
                    {
                        name: "HandOver",
                        base: "/trsf/hndv/gnrl",
                        children: [
                            {
                                name: "HandOver List",
                                to: "/cgme0404001q",
                            },
                            {
                                name: "HandOver Amendment List",
                                to: "/cgme0404011q",
                            },
                            {
                                name: "HandOver Cancellation List",
                                to: "/cgme0404021q",
                            },
                            {
                                name: "HandOver List for Simple Transfer",
                                to: "/cgme0404031q",
                            },
                        ],
                    },
                    {
                        name: "HandOver (Post)",
                        base: "/trsf/hndv/post",
                        children: [
                            {
                                name: "HandOver List (Post)",
                                to: "/cgme0404041q",
                            },
                            {
                                name: "HandOver Amendment List (Post)",
                                to: "/cgme0404051q",
                            },
                            {
                                name: "HandOver Cancellation List (Post)",
                                to: "/cgme0404061q",
                            },
                            {
                                name: "HandOver List for Simple Transfer (Post)",
                                to: "/cgme0404071q",
                            },
                        ],
                    },
                    {
                        name: "Stripping",
                        base: "/bw/strpng",
                        children: [
                            {
                                name: "Stripping Schedule List",
                                to: "/cgme0406001q",
                            },
                            {
                                name: "Stripping Result Report",
                                to: "/cgme0406002q",
                            },
                            {
                                name: "Stripping Result Amendment",
                                to: "/cgme0406008q",
                            },
                            {
                                name: "Stripping Result Cancellation",
                                to: "/cgme0406012q",
                            },
                        ],
                    },
                    {
                        name: "Report",
                        base: "/trsf/bt/othr",
                        children: [
                            {
                                name: "Through Transit Report",
                                to: "/cgme0306001q",
                            },
                        ],
                    },
                    {
                        name: "Ownership Transfer of Goods",
                        base: "/bw/owrs",
                        children: [
                            {
                                name: "Ownership Transfer",
                                to: "/cgme0407001q",
                            },
                            {
                                name: "Ownership Transfer Cancellation",
                                to: "/cgme0407003q",
                            },
                        ],
                    },
                    {
                        name: "Cargo Receipt",
                        base: "/bw/rcpt",
                        children: [
                            {
                                name: "Cargo Receipt",
                                to: "/cgme0408001q",
                            },
                            {
                                name: "Cargo Receipt Amendment",
                                to: "/cgme0408003q",
                            },
                            {
                                name: "Cargo Receipt Cancellation",
                                to: "/cgme0408006q",
                            },
                        ],
                    },
                    {
                        name: "Warehousing Period Extension Application",
                        base: "/cw/ovst",
                        children: [
                            {
                                name: "Warehousing Period Extension",
                                to: "/cgme0410001q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "My Page",
                base: "",
                children: [
                    {
                        name: "Driver and Vehicle",
                        base: "/trsf/bt/othr",
                        children: [
                            {
                                name: "TANROADS Through Transit Information",
                                to: "/cgme0901011q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Tracking",
                base: "",
                children: [
                    {
                        name: "Cargo Tracking",
                        base: "/trkng",
                        children: [
                            {
                                name: "Cargo Tracking",
                                to: "/cgme0910001q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Customs Warehouse",
                base: "",
                children: [
                    {
                        name: "Overstayed Cargo Management",
                        base: "/cw/ovst",
                        children: [
                            {
                                name: "F43 Notice",
                                to: "/cgme0501001q",
                            },
                            {
                                name: "WES Registration for F43",
                                to: "/cgme0502001s",
                            },
                            {
                                name: "WES Split",
                                to: "/cgme0502006s",
                            },
                            {
                                name: "WES Registration",
                                to: "/cgme0502002q",
                            },
                        ],
                    },
                    {
                        name: "Deposit Notice Management",
                        base: "/cw/dpst",
                        children: [
                            {
                                name: "Deposit Notice",
                                to: "/cgme0501002q",
                            },
                            {
                                name: "WES Registration for Deposit Notice",
                                to: "/cgme0502009s",
                            },
                        ],
                    },
                    {
                        name: "Auction Goods",
                        base: "/onln/actn",
                        children: [
                            {
                                name: "Auction Goods List",
                                to: "/cgme0504001q",
                            },
                            {
                                name: "Cart",
                                to: "/cgme0504003s",
                            },
                            {
                                name: "Auction Bid Result List",
                                to: "/cgme0504005q",
                            },
                            {
                                name: "Donation Goods List",
                                to: "/cgme0504006q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "SP/EPZ&MUB/Catering/Duty Free Shop",
                base: "",
                children: [
                    {
                        name: "Specific Code",
                        base: "/io/spcd",
                        children: [
                            {
                                name: "Specific Code Application",
                                to: "/cgme0601001q",
                            },
                            {
                                name: "Specific Code List",
                                to: "/cgme0601003q",
                            },
                        ],
                    },
                    {
                        name: "EPZ&MUB",
                        base: "/io/dmsc",
                        children: [
                            {
                                name: "EPZ&MUB Domestic Goods Carry-In Report",
                                to: "/cgme0602001q",
                            },
                            {
                                name: "EPZ&MUB Domestic Goods Carry-In Report Cancellation",
                                to: "/cgme0602003q",
                            },
                            {
                                name: "EPZ&MUB Processing Report",
                                to: "/cgme0602007q",
                            },
                            {
                                name: "EPZ&MUB Processing Report Cancellation",
                                to: "/cgme0602011q",
                            },
                            {
                                name: "EPZ&MUB Product Report",
                                to: "/cgme0602014q",
                            },
                            {
                                name: "EPZ&MUB Product Report Cancellation",
                                to: "/cgme0602018q",
                            },
                            {
                                name: "EPZ&MUB Domestic Goods Inventory List",
                                to: "/cgme0602021q",
                            },
                            {
                                name: "EPZ&MUB Inventory List",
                                to: "/cgme0602023q",
                            },
                            {
                                name: "EPZ&MUB Finished Product Inventory List",
                                to: "/cgme0602026q",
                            },
                            {
                                name: "EPZ&MUB By-Product Inventory List",
                                to: "/cgme0602028q",
                            },
                            {
                                name: "EPZ&MUB Waste Inventory List",
                                to: "/cgme0602030q",
                            },
                        ],
                    },
                    {
                        name: "Duty-Free Shop",
                        base: "/io/dfs",
                        children: [
                            {
                                name: "Duty-Free Shop Selling Report",
                                to: "/cgme0604001q",
                            },
                            {
                                name: "Removal Request",
                                to: "/cgme0604005q",
                            },
                            {
                                name: "Removal Request Cancellation",
                                to: "/cgme0604007q",
                            },
                            {
                                name: "DFS BL List",
                                to: "/cgme0604010q",
                            },
                        ],
                    },
                    {
                        name: "Search Inventory",
                        base: "/bw/stck",
                        children: [
                            {
                                name: "Warehouse Inventory List ",
                                to: "/cgme0403001q",
                            },
                        ],
                    },
                    {
                        name: "Production Input Output Matrix",
                        base: "/io/mtrx",
                        children: [
                            {
                                name: "Production Input Output Matrix",
                                to: "/cgme0603001q",
                            },
                            {
                                name: "Production Input Output Matrix Cancellation",
                                to: "/cgme0603003q",
                            },
                            {
                                name: "Production Input Output Matrix Blocking",
                                to: "/cgme0603007q",
                            },
                        ],
                    },
                    {
                        name: "Catering",
                        base: "/io/dmsc",
                        children: [
                            {
                                name: "Catering Domestic Goods Carry-In Report",
                                to: "/cgme0602001q",
                            },
                            {
                                name: "Catering Domestic Goods Carry-In Report Cancellation",
                                to: "/cgme0602003q",
                            },
                            {
                                name: "Catering Processing Report",
                                to: "/cgme0605001q",
                            },
                            {
                                name: "Catering Processing Report Cancellation",
                                to: "/cgme0605005q",
                            },
                            {
                                name: "Catering Production Report",
                                to: "/cgme0605008q",
                            },
                            {
                                name: "Catering Production Report Cancellation",
                                to: "/cgme0605013q",
                            },
                            {
                                name: "Catering Loading Report",
                                to: "/cgme0605016q",
                            },
                            {
                                name: "Catering Inventory List",
                                to: "/cgme0605019q",
                            },
                            {
                                name: "Catering Domestic Goods Inventory List",
                                to: "/cgme0602021q",
                            },
                            {
                                name: "Catering Finished Product Inventory List",
                                to: "/cgme0605022q",
                            },
                        ],
                    },
                    {
                        name: "Monthly Return",
                        base: "/wrhs/rprt",
                        children: [
                            {
                                name: "Monthly Return",
                                to: "/cgme0606001q",
                            },
                        ],
                    },
                    {
                        name: "Annual Return",
                        base: "/wrhs/rprt",
                        children: [
                            {
                                name: "Annual Return",
                                to: "/cgme0606004q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Transires",
                base: "",
                children: [
                    {
                        name: "Transires Loading",
                        base: "/load/trsr",
                        children: [
                            {
                                name: "Loading Declaration",
                                to: "/cgme0208001q",
                            },
                            {
                                name: "Loading Declaration Amendment",
                                to: "/cgme0208004q",
                            },
                            {
                                name: "Loading Declaration Cancellation",
                                to: "/cgme0208006q",
                            },
                            {
                                name: "Loading Result Report",
                                to: "/cgme0208008q",
                            },
                            {
                                name: "Loading Result Report Amendment",
                                to: "/cgme0208017q",
                            },
                            {
                                name: "Loading Result Report Cancellation",
                                to: "/cgme0208020q",
                            },
                        ],
                    },
                    {
                        name: "Transires Discharge",
                        base: "/dscg/trsr",
                        children: [
                            {
                                name: "Discharge Report",
                                to: "/cgme0204001q",
                            },
                        ],
                    },
                    {
                        name: "Transires Manifest",
                        base: "/mnfs/trsr",
                        children: [
                            {
                                name: "Manifest Registration",
                                to: "/cgme0109001q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Vehicle Management",
                base: "",
                children: [
                    {
                        name: "Temporary Export Vehicle",
                        base: "/tmvh",
                        children: [
                            {
                                name: "Temporary Export Vehicle",
                                to: "/cgme0702001q",
                            },
                            {
                                name: "Temporary Export Vehicle Extension",
                                to: "/cgme0702002q",
                            },
                        ],
                    },
                    {
                        name: "Temporary Import Vehicle",
                        base: "/tmvh",
                        children: [
                            {
                                name: "Temporary Import Vehicle",
                                to: "/cgme0701001q",
                            },
                            {
                                name: "Temporary Import Vehicle Extension",
                                to: "/cgme0701003q",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Enforcement Management",
        base: process.env.REACT_APP_BASE_EFM,
        children: [
            {
                name: "Offence Report Management",
                base: "/offe",
                children: [
                    {
                        name: "Offence Report List",
                        to: "/efme0104016q",
                    },
                    {
                        name: "Case Settlement Application Registration",
                        to: "/efme0104032s",
                    },
                ],
            },
        ],
    },
    {
        name: "ECT Management",
        base: process.env.REACT_APP_BASE_ECT,
        children: [
            {
                name: "Device Vendor Management",
                base: "",
                children: [
                    {
                        name: "Device Vendor",
                        base: "/vndr",
                        children: [
                            {
                                name: "Device Vendor Registration Request List",
                                to: "/ecte0901001q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Device Management",
                base: "",
                children: [
                    {
                        name: "Master Device",
                        base: "/dvce",
                        children: [
                            {
                                name: "Master Device Registration Request List",
                                to: "/ecte0401001q",
                            },
                            {
                                name: "Master Device Cancellation Request List",
                                to: "/ecte0401005q",
                            },
                        ],
                    },
                    {
                        name: "Slave Device",
                        base: "/dvce",
                        children: [
                            {
                                name: "Slave Device Registration Request List",
                                to: "/ecte0401011q",
                            },
                            {
                                name: "Slave Device Cancellation Request List",
                                to: "/ecte0401015q",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Cargo Information",
                base: "/info",
                children: [
                    {
                        name: "Trip on Transit",
                        to: "/ecte0205001q",
                    },
                    {
                        name: "Active Map",
                        to: "/ecte0205002q",
                    },
                ],
            },
        ],
    },
    {
        name: "SCT Management",
        base: process.env.REACT_APP_BASE_SCT,
        children: [
            {
                name: "SCT Consignment Note",
                base: "/csmn",
                children: [
                    {
                        name: "SCT Consignment Note List",
                        to: "/scte0106001q",
                    },
                    {
                        name: "SCT Consignment Note Cancellation List",
                        to: "/scte0107001q",
                    },
                ],
            },
            {
                name: "C2 Delaration",
                base: "/c2/dcla",
                children: [
                    {
                        name: "C2 Delaration List",
                        to: "/scte0101001q",
                    },
                    {
                        name: "C2 Delaration Amendment List",
                        to: "/scte0102001q",
                    },
                    {
                        name: "C2 Vehicle Assignment List",
                        to: "/scte0103001q",
                    },
                    {
                        name: "C2 Multimodal List",
                        to: "/scte0104001q",
                    },
                    {
                        name: "C2 Multimodal Amendment List",
                        to: "/scte0105001q",
                    },
                ],
            },
            {
                name: "Exit Note",
                base: "/exnote/dcla",
                children: [
                    {
                        name: "Exit Note List",
                        to: "/scte0201001q",
                    },
                    {
                        name: "Exit Note Amendment List",
                        to: "/scte0202001q",
                    },
                    {
                        name: "Exit Note Vehicle Assignment List",
                        to: "/scte0203001q",
                    },
                    {
                        name: "Exit Note Multimodal List",
                        to: "/scte0204001q",
                    },
                    {
                        name: "Exit Note Multimodal Amendment List",
                        to: "/scte0205001q",
                    },
                ],
            },
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
            {
                name: "Wharfage Bill",
                base: "",
                children: [
                    {
                        name: "Wharfage Bill List",
                        to: "/cole0101001q",
                    },
                ],
            },
        ],
    },
];

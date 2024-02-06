import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Page, Group, Layout, Button, FormControl } from "@/comn/components"; // 화면 구성 컴포넌트
import {
    useForm,
    useFetch,
    useWijmo,
    useModal,
    useStore,
    useToast,
    TFormSchema,
    WijmoSchemaType,
    usePopup,
} from "@/comn/hooks"; // hook
import { BASE, URLS, APIS } from "./services/CgmeBtDclaService";

/*
 * @ 화면 컴포넌트 주석
 * @ 메타 시스템을 참고 하여 표준 단어와 용어를 사용하여 작성
 * @ !== ... ==! 치환 부호는 개발 완료 후 한글 주석을 인지하여 제거하기 위한 표시
 * @ 기본 여러줄의 주석 형태를 사용
 * @ 포맷
 * @ [화면명 영문]
 * @ [지환부호시작] [화면명 한글] [치환부호종료]
 *
 * 화면명 영문
 * !== 화면명 한글 ==!
 */
export const CGME0303001Q = (props: any) => {
    //Search SCHEMA
    const SF_BT_M_SRCH: TFormSchema = {
        id: "form_CgmeBtMSrch",
        schema: {
            searchDclrNo: { type: "text" },
            searchDateType: { type: "select", required: true },
            searchDclrNoType: { type: "select" },
            prcssStatCd: {
                type: "checkbox",
                label: "L_PRCSS_STAT_CD",
                area: "comnCd",
                controlSize: 10,
                comnCd: "COM_0100",
                all: true,
            },
            dtmRnge: {
                type: "daterange",
                // label: "L_PRCSS_DTM",
                // start: { name: "dtmFrom", required: true },
                // end: { name: "dtmTo", required: true },
                start: { name: "dtmFrom" },
                end: { name: "dtmTo" },
                rangeButton: 0,
                controlSize: 10,
                required: true,
            },
        },
    };
    /**
     * Grid Header !==그리드 헤더 ==!
     */
    // const SG_BT_M_LIST: WijmoSchemaType = {
    //     id: "btMListGrid",
    //     options: { pagination: "out", isReadOnly: true, checkbox: true },
    //     head: [
    //         { cells: [{ header: "L_DCLR_NO", binding: "dclrNo" }] },
    //         { cells: [{ header: "L_CRN", binding: "crn" }] },
    //         { cells: [{ header: "L_BL_NO", binding: "blNo" }] },
    //         { cells: [{ header: "Submission Date", binding: "sbmtDt" }] },
    //         { cells: [{ header: "Reference No", binding: "tansadNo" }] },
    //         { cells: [{ header: "Country", binding: "dstnCntyCd" }] },
    //         { cells: [{ header: "Regime", binding: "regmCd" }] },
    //         { cells: [{ header: "Place of Depature", binding: "dptrWrhsCd" }] },
    //         { cells: [{ header: "Place of Arrival", binding: "dstnWrhsCd" }] },
    //         { cells: [{ header: "T1", binding: "t1" }] },
    //         { cells: [{ header: "Number of Vehicle" }] },
    //         { cells: [{ header: "L_PRCSS_STAT", binding: "prcssStatCd" }] },
    //     ],
    //     body: [
    //         {
    //             cells: [
    //                 {
    //                     render: (cellData) => {
    //                         return (
    //                             // <div>
    //                             //   <span
    //                             //     className="underline"
    //                             //     onClick={() => {
    //                             //       handler.click_Grid_List(`${cellData.rowValues.dclrNo}`);
    //                             //     }}
    //                             <span className="underline">{`${cellData.rowValues.dclrNo}`}</span>
    //                             // </div>
    //                         );
    //                     },
    //                     binding: `dclrNo`,
    //                     width: 200,
    //                 },
    //             ],
    //         },
    //         { cells: [{ binding: "crn", width: 150 }] },
    //         { cells: [{ binding: "blNo", width: 120 }] },
    //         { cells: [{ binding: "sbmtDt", width: 100 }] },
    //         { cells: [{ binding: "tansadNo", width: 150 }] },
    //         { cells: [{ binding: "dstnCntyCd", width: 80 }] },
    //         { cells: [{ binding: "regmCd", width: 80 }] },
    //         { cells: [{ binding: "dptrWrhsCd", width: 200 }] },
    //         { cells: [{ binding: "dstnWrhsCd", width: 200 }] },
    //         { cells: [{ binding: "t1", width: 150 }] },
    //         { cells: [{ binding: "vhclCnt", width: 80 }] },
    //         {
    //             cells: [
    //                 {
    //                     render: (cellData) => {
    //                         return `[${cellData.rowValues.prcssStatCd}]${cellData.rowValues.prcssDtm}`;
    //                     },
    //                     binding: "prcssStatCd",
    //                     width: 100,
    //                 },
    //             ],
    //         },
    //     ],
    // };
    const SG_BT_M_LIST: WijmoSchemaType = {
        id: "btMListGrid",
        options: { pagination: "in", isReadOnly: true, checkbox: true },
        head: [
            {
                cells: [
                    { header: "L_DCLR_NO", binding: "dclrNo" },
                    { header: "L_CRN", binding: "crn" },
                ],
            },
            { cells: [{ header: "L_BL_NO", binding: "blNo" }] },
            { cells: [{ header: "Submission Date", binding: "sbmtDt" }] },
            { cells: [{ header: "Reference No", binding: "tansadNo" }] },
            { cells: [{ header: "Country", binding: "dstnCntyCd" }] },
            { cells: [{ header: "Regime", binding: "regmCd" }] },
            { cells: [{ header: "Place of Depature", binding: "dptrWrhsCd" }] },
            { cells: [{ header: "Place of Arrival", binding: "dstnWrhsCd" }] },
            { cells: [{ header: "T1", binding: "t1" }] },
            { cells: [{ header: "Number of Vehicle" }] },
            { cells: [{ header: "L_PRCSS_STAT", binding: "prcssStatCd" }] },
        ],
        body: [
            {
                cells: [
                    {
                        render: (cellData) => {
                            return (
                                // <div>
                                //   <span
                                //     className="underline"
                                //     onClick={() => {
                                //       handler.click_Grid_List(`${cellData.rowValues.dclrNo}`);
                                //     }}
                                <span className="underline">{`${cellData.rowValues.dclrNo}`}</span>
                                // </div>
                            );
                        },
                        binding: `dclrNo`,
                        width: 200,
                    },
                    { binding: "crn", width: 150 },
                ],
            },
            { cells: [{ binding: "blNo", width: 120 }] },
            { cells: [{ binding: "sbmtDt", width: 100 }] },
            { cells: [{ binding: "tansadNo", width: 150 }] },
            { cells: [{ binding: "dstnCntyCd", width: 80 }] },
            { cells: [{ binding: "regmCd", width: 80 }] },
            { cells: [{ binding: "dptrWrhsCd", width: 200 }] },
            { cells: [{ binding: "dstnWrhsCd", width: 200 }] },
            { cells: [{ binding: "t1", width: 150 }] },
            { cells: [{ binding: "vhclCnt", width: 80 }] },
            {
                cells: [
                    {
                        render: (cellData) => {
                            return `[${cellData.rowValues.prcssStatCd}]${cellData.rowValues.prcssDtm}`;
                        },
                        binding: "prcssStatCd",
                        width: 100,
                    },
                ],
            },
        ],
    };
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0303-001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { openPopup } = usePopup();

    //그리드에서 다건 삭제시 필요한 신고서 번호를 담기 위한 변수.
    let dclrNos: any[] = [];
    // console.log(props);

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        btMSrch: useForm({
            defaultSchema: SF_BT_M_SRCH,
            defaultValues: { ...pgeStore?.form, searchDateType: "1", searchDclrNoType: "1" } || {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        btMList: useWijmo({
            defaultSchema: SG_BT_M_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getCgmeBtList: useFetch({
            api: (page = grid.btMList.page) => {
                return APIS.getCgmeBtList(form.btMSrch.getValues(), page, grid.btMList.size);
            },
            enabled: comnUtils.isEmpty(form.btMSrch.errors) && form.btMSrch.isSubmitted,
            key: [grid.btMList.page, grid.btMList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.btMSrch.getValues(),
                    page: grid.btMList.page,
                    size: grid.btMList.size,
                });
            },
            onError: () => {
                console.log(1111);
            },
            showToast: true,
        }),
        deleteCgmeBtList: useFetch({
            api: (data) => APIS.deleteCgmeBtList(dclrNos),
            onSuccess: () => {
                handler.getCgmeBtList();
                modal.openModal({
                    content: "msg.00003",
                });
            },
            onError: () => {
                modal.openModal({ content: "msg.00006" });
            },
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        getCgmeBtList: () => {
            form.btMSrch.handleSubmit(
                (data) => {
                    grid.btMList.setPage(0);
                    fetch.getCgmeBtList.fetch(0);
                },
                (data) => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        // click_Grid_List: (dclrNo: any) => {
        //   console.log(">>>> %s", dclrNo);
        //   navigate(`${URLS.cgme0303002s}/` + dclrNo);
        // },
        click_Grid_List: {
            dclrNo: (data: any) => {
                const dclrNo = `${data.rowValues.dclrNo}`;
                // console.log(">>>> %s", dclrNo);
                navigate(`${URLS.cgme0303002s}/${dclrNo}`);
            },
        },
        deleteCgmeBtList: () => {
            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    fetch.deleteCgmeBtList.fetch(dclrNos);
                },
            });
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        form.btMSrch.setValue("prcssDtmFrom", comnUtils.getDate({ d: -7 }));
        form.btMSrch.setValue("prcssDtmTo", comnUtils.getDate());
        //fetch.getCgmeBtList.fetch();
        handler.getCgmeBtList();
    }, []);

    /**
     * Document Layout
     */
    return (
        <>
            <Page
                id={pgeUid}
                title={t("T_BT_DCLA_LST")}
                description={t("T_BT_DCLA_LST")}
                navigation={{
                    base: comnEnvs.base,
                    nodes: [...BASE.nodes, { path: "/trsf/bt/dcla/cgme0303001q", label: "T_BT_DCLA_LST" }],
                }}
            ></Page>

            <Group>
                <Group.Body>
                    <Group.Section>
                        <Group.Row>
                            <Group.Label
                                {...form.btMSrch.schema.searchDateType}
                                options={[
                                    { label: "LRGSR_DTM", value: "1" },
                                    { label: "L_SBMT_DT", value: "2" },
                                ]}
                            ></Group.Label>
                            <Group.Col colSize={10}>
                                <Group.Control {...form.btMSrch.schema.dtmRnge} controlSize={10}></Group.Control>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            {/* MRN !== MRN ==!  */}
                            {/* <Group.Control {...form.btMSrch.schema.dclrNo}></Group.Control> */}
                            <Group.Label
                                {...form.btMSrch.schema.searchDclrNoType}
                                options={[
                                    { label: "L_BT_DCLR_NO", value: "1" },
                                    { label: "L_CRN", value: "2" },
                                    { label: "L_REFF_NO", value: "3" },
                                ]}
                            ></Group.Label>
                            <Group.Col colSize={10}>
                                <Group.Control {...form.btMSrch.schema.searchDclrNo} controlSize={10}></Group.Control>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            {/* Processing Status !== 처리상태 ==!  */}
                            <Group.Control {...form.btMSrch.schema.prcssStatCd}></Group.Control>
                        </Group.Row>
                    </Group.Section>

                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                role="reset"
                                onClick={() => {
                                    form.btMSrch.reset();
                                }}
                            ></Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button
                                role="search"
                                onClick={() => {
                                    handler.getCgmeBtList();
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                </Group.Body>
            </Group>

            <Group>
                <Group.Body>
                    {/* onCellClick={handler.click_Grid_List} */}
                    <Wijmo
                        {...grid.btMList.grid}
                        data={fetch.getCgmeBtList.data?.getCgmeBtList}
                        onCellClick={handler.click_Grid_List}
                    />
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    // 신고서 작성 시 대상 조회 팝업창으로 데이터 선택 후 입력 화면으로 넘어갈 수 있도록 수정.
                                    //navigate(URLS.cgme0303002s);
                                    openPopup({
                                        url: URLS.cgme0303003q,
                                        size: "lg",
                                        callback: ({ data = Array<any> }) => {
                                            console.log(data);
                                            const param = {
                                                trsfBaseNo: data[0].tansadNo,
                                                tansadNo: data[0].tansadNo,
                                                tansadCstmOfceCd: data[0].tansadCstmOfceCd,
                                                tansadYy: data[0].tansadYy,
                                                tansadSrno: data[0].tansadSrno,
                                                godsDesc: data[0].godsDesc,
                                                btBaseTpCd: data[0].btBaseTpCd,
                                                blNo: data[0].blNo,
                                                crn: data[0].crn,
                                                mrn: data[0].mrn,
                                                msn: data[0].msn,
                                            };
                                            // 파라메터를 가지고 화면을 이동합니다.
                                            navigate(URLS.cgme0303002s, { state: param });
                                        },
                                    });
                                }}
                            >
                                {t("B_NEW_$0", { 0: t("") })}
                            </Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button
                                role="delete"
                                onClick={() => {
                                    dclrNos = [];
                                    const selectList: any[] = grid.btMList.getChecked() || [];
                                    // console.log(selectList.length);
                                    if (comnUtils.isEmpty(selectList)) {
                                        modal.openModal({ content: "msg.00004" });
                                        return;
                                    }
                                    selectList.forEach((item) => {
                                        dclrNos.push(item.dclrNo);
                                    });
                                    // console.log("val : %s", dclrNos);
                                    handler.deleteCgmeBtList();
                                    // navigate(URLS.cgme0411002s);
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                </Group.Body>
            </Group>
            <a
                href="#"
                onClick={() => {
                    fetch.getCgmeBtList.setShowToast(false);
                    handler.getCgmeBtList();
                }}
            >
                ShowToast 비활성
            </a>

            <a
                href="#"
                onClick={() => {
                    fetch.getCgmeBtList.setShowToast(true);
                    handler.getCgmeBtList();
                }}
            >
                ShowToast 활성
            </a>
        </>
    );
};

export default CGME0303001Q;

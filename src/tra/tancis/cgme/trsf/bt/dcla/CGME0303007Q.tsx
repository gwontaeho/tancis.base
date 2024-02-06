import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
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
} from "@/comn/hooks";

import { BASE, URLS, APIS, PRCS_TP_CD } from "./services/CgmeBtDclaService";

export const CGME0303007Q = (props: any) => {
    // const { data } = props;
    // console.log(data);
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0303-007Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변화 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { close, postMessage, getParams } = usePopup();
    const params = getParams();

    //FORM SCHEMA
    const SF_BT_VHCL_R: TFormSchema = {
        id: "form_CgmeBtVhclR",
        schema: {
            dclrNo: { type: "text", label: "L_DCLR_NO" },
            vhclSrno: { type: "number", label: "L_VHCL_SRNO" },
            dcltTin: { type: "text", label: "L_DCLT_TIN" },
            dclrYy: { type: "text", label: "L_DCLR_YY" },
            prcsTpCd: { type: "text", label: "L_PRCS_TP_CD" },
            dclrSrno: { type: "text", label: "L_DCLR_SRNO" },
            drvrLcneNo: { type: "text", label: "L_DRVR_LCNE_NO", required: true },
            tripNo: { type: "text", label: "L_TRIP_NO" },
            prcssYn: { type: "text", label: "L_PRCSS_YN" },
            prcssYnDt: { type: "text", label: "L_PRCSS_YN_DT" },
            vhclNo: { type: "text", label: "L_VHCL_NO", rightButton: { icon: "search" } },
            c45No: { type: "text", label: "L_C45_NO", rightButton: { icon: "search" } },
            chssNo: { type: "text", label: "L_CHSS_NO", required: true },
            drvrNm: { type: "text", label: "L_DRVR_NM", required: true },
            vhclOwrYn: { type: "checkbox", label: "L_VHCL_OWR_YN" },
            drvrPsprNo: { type: "text", label: "L_DRVR_PSPR_NO" },
            drvrTelno: { type: "text", label: "L_DRVR_TELNO" },
            trlrNo: { type: "text", label: "L_TRLR_NO" },
            semiTrlrNo: { type: "text", label: "L_SEMI_TRLR_NO" },
            bondVal: { type: "number", label: "L_BOND_VAL" },
            bcodeNo: { type: "text", label: "L_BCODE_NO" },
            subT1No: { type: "text", label: "L_SUB_T1_NO" },
            loadPckgNo: { type: "number", label: "L_LOAD_PCKG_NO" },
            pckgUtCd: { type: "select", label: "L_PCKG_UT_CD" },
            loadWght: { type: "number", label: "L_LOAD_WGHT", required: true },
            wghtUtCd: { type: "select", label: "L_WGHT_UT_CD", required: true },
            sealAtchTpCd: { type: "select", label: "L_SEAL_ATCH_TP_CD", edit: false },
            cstmSealNo1: { type: "text", label: "L_CSTM_SEAL_NO_1" },
            cstmSealNo2: { type: "text", label: "L_CSTM_SEAL_NO_2" },
            cstmSealNo3: { type: "text", label: "L_CSTM_SEAL_NO_3" },
            sealAtchDt: { type: "text", label: "L_SEAL_ATCH_DT" },
            sealAtchCn: { type: "text", label: "L_SEAL_ATCH_CN" },
            isprId: { type: "text", label: "L_ISPR_ID" },
            bondOwrYn: { type: "text", label: "L_BOND_OWR_YN" },
            horsNo: { type: "text", label: "L_HORS_NO" },
            railYn: { type: "radio", label: "L_RAIL_YN" },
            preDclrNo: { type: "text", label: "L_PRE_DCLR_NO" },
            dclrInstncId: { type: "text", label: "L_DCLR_INSTNC_ID" },
            bondUsdVal: { type: "number", label: "L_BOND_USD_VAL" },
            carnNo: { type: "text", label: "L_CARN_NO" },
            delYn: { type: "text", label: "L_DEL_YN" },
            frstRegstId: { type: "text", label: "L_FRST_REGST_ID" },
            frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM" },
            lastMdfrId: { type: "text", label: "L_LAST_MDFR_ID" },
            lastMdfyDtm: { type: "text", label: "L_LAST_MDFY_DTM" },
        },
    };

    const SG_CNTR_LIST: WijmoSchemaType = {
        id: "btVhclCntrListGrid",
        options: { isReadOnly: true },
        head: [
            { cells: [{ header: "L_NO", binding: "rnum" }] },
            { cells: [{ header: "L_CNTR_NO", binding: "cntrNo" }] },
            { cells: [{ header: "L_CNTR_TP_CD", binding: "pcknUtCd" }] },
            { cells: [{ header: "L_CNTR_SIZE", binding: "cntrSizeCd" }] },
            { cells: [{ header: "L_SEAL_NO_1", binding: "sealNo1" }] },
            { cells: [{ header: "L_SEAL_NO_2", binding: "sealNo2" }] },
            { cells: [{ header: "L_PCKG_NO" }] },
            { cells: [{ header: "L_CSTM_SEAL_NO_1" }] },
            { cells: [{ header: "L_CSTM_SEAL_NO_2" }] },
        ],
        body: [
            { cells: [{ binding: "rnum", width: "*" }] },
            { cells: [{ binding: "cntrNo", width: 100 }] },
            { cells: [{ binding: "pcknUtCd", width: 100 }] },
            { cells: [{ binding: "cntrSizeCd", width: 100 }] },
            { cells: [{ binding: "sealNo1", width: 120 }] },
            { cells: [{ binding: "sealNo2", width: 120 }] },
            {
                cells: [
                    {
                        render: (cellData) => {
                            const cntrPckgNo = comnUtils.replaceEmpty(cellData.rowValues.cntrPckgNo);
                            // const pckgUtCd = comnUtils.replaceEmpty(cellData.rowValues.cntrPckgNo)
                            const cntrWght = comnUtils.replaceEmpty(cellData.rowValues.cntrWght);
                            // const wghtUtCd = comnUtils.replaceEmpty(cellData.rowValues.wghtUtCd);
                            return `${cntrPckgNo} / ${cntrWght}`;
                        },
                        binding: "sealNo2",
                        width: 200,
                    },
                ],
            },
            { cells: [{ binding: "cstmSealNo1", width: 120 }] },
            { cells: [{ binding: "cstmSealNo2", width: 120 }] },
        ],
    };

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        btVhclRDto: useForm({
            defaultSchema: SF_BT_VHCL_R,
            defaultValues: {
                delYn: "N",
            },
        }),
    };
    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        btVhclCntrList: useWijmo({
            defaultSchema: SG_CNTR_LIST,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getBtVhclInfo: useFetch({
            api: (data: any) => APIS.getBtVhclInfo(params.dclrNo, params.vhclSrno),
            onSuccess: (data) => {
                // console.log("getBtVhclInfo =======> : " + JSON.stringify(data.vhclInfoDto.content));
                try {
                    form.btVhclRDto.setValues({
                        ...data.vhclInfoDto.content,
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            onError: () => {
                // if (comnUtils.isPopup()) {
                //     modal.openModal({
                //         content: "msg.00006",
                //     });
                // }
            },
            showToast: true,
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        getBtVhclInfo: () => {
            fetch.getBtVhclInfo.fetch();
        },
        saveBtVhclInfo: form.btVhclRDto.handleSubmit(
            () => {
                const btVhclRDto = form.btVhclRDto.getValues();
                //btVhclRDto.vhclOwrYn = btVhclRDto.vhclOwrYn.join("");
                const vhclData = { ...btVhclRDto, cntrList: grid.btVhclCntrList.getData() || [] };
                console.log(vhclData);
                postMessage({ data: [vhclData] });
                close();
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
    };
    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        // console.log("params =====>" + JSON.stringify(params));
        if (!comnUtils.isEmpty(params)) {
            // 신고서 번호가 존재하고.
            if (!comnUtils.isEmpty(params.dclrNo)) {
                // 차량 일련번호가 0또는 null 이 아닌 경우 상세조회를 하도록 한다.
                if (params.vhclSrno !== 0 || !comnUtils.isEmpty(params.vhclSrno)) {
                    handler.getBtVhclInfo();
                }
            }
        }
        // !==Modal Layer 사용시 주석 해제.==!
        // form.btVhclRDto.setValues(data);
        // }, [data]);
    }, []);

    return (
        <>
            <Group>
                <Group.Body>
                    <Group.Title title="BT Declaration Vehicle Details" titleSize={2}></Group.Title>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title="Vehicle Information" titleSize={3}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.c45No}></Group.Control>
                            <Group.Control
                                {...form.btVhclRDto.schema.railYn}
                                options={[
                                    { label: "Railway", value: "Y" },
                                    { label: "Sea", value: "S" },
                                ]}
                            ></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.drvrNm}></Group.Control>
                            <Group.Control {...form.btVhclRDto.schema.drvrLcneNo}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.drvrPsprNo}></Group.Control>
                            <Group.Control {...form.btVhclRDto.schema.drvrTelno}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.chssNo}></Group.Control>
                            <Group.Control
                                {...form.btVhclRDto.schema.vhclOwrYn}
                                options={[{ label: "", value: "Y" }]}
                            ></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.vhclNo}></Group.Control>
                            <Group.Control {...form.btVhclRDto.schema.horsNo}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.trlrNo}></Group.Control>
                            <Group.Control {...form.btVhclRDto.schema.semiTrlrNo}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btVhclRDto.schema.bondVal}></Group.Control>
                            <Group.Control {...form.btVhclRDto.schema.sealAtchTpCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label="L_PCKG_NO"></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btVhclRDto.schema.loadPckgNo}></Group.Control>
                                <Group.Control
                                    {...form.btVhclRDto.schema.pckgUtCd}
                                    options={[{ label: "PK, Package(s)", value: "PK" }]}
                                ></Group.Control>
                            </Group.Col>
                            <Group.Label label="L_NET_WGHT" required={true}></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btVhclRDto.schema.loadWght}></Group.Control>
                                <Group.Control
                                    {...form.btVhclRDto.schema.wghtUtCd}
                                    options={[{ label: "KG, Kilogram", value: "KG" }]}
                                ></Group.Control>
                            </Group.Col>
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title="Container information" titleSize={3}></Group.Title>
                    <Group.Section>
                        <Layout direction="row">
                            <Layout.Right>
                                <Layout.Button role="gridAdd"></Layout.Button>
                                <Layout.Button role="gridDelete"></Layout.Button>
                            </Layout.Right>
                        </Layout>
                        <Wijmo {...grid.btVhclCntrList.grid}></Wijmo>
                    </Group.Section>
                    <Layout direction="row">
                        <Layout.Right>
                            <Layout.Button>{t("Print Movement Sheet")}</Layout.Button>
                            <Layout.Button>{t("Print Sub-T1")}</Layout.Button>
                            <Layout.Button
                                role="save"
                                onClick={() => {
                                    handler.saveBtVhclInfo();
                                }}
                            ></Layout.Button>
                            {comnUtils.isPopup() && (
                                <Layout.Button
                                    role="close"
                                    onClick={() => {
                                        close();
                                    }}
                                ></Layout.Button>
                            )}
                        </Layout.Right>
                    </Layout>
                </Group.Body>
            </Group>
        </>
    );
};

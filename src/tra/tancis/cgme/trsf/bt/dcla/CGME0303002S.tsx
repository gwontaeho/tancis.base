import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils } from "@/comn/utils"; // 프로젝트 공통 유틸
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Group, Layout, Button } from "@/comn/components"; // 화면 구성 컴포넌트
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
// Not use Modal Layer remark. !==모달 레이어 미사용으로 주석처리.==!
// import { CGME0303007Q } from "./CGME0303007Q";
import { URLS, APIS, PRCS_TP_CD } from "./services/CgmeBtDclaService";
import lodash from "lodash";

export const CGME0303002S = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0303-002S"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const location = useLocation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { dclrNo } = useParams(); //Key Parameter !== 넘어온 키 Parameter ==!
    const [btVhclList, setBtVhclList] = useState({ content: new Array<any>(), page: {} });
    const [prcssStatCd, setPrcssStatCd] = useState(PRCS_TP_CD.NONE);
    const editable = false;
    const { openPopup } = usePopup();
    const { pgeStore, setStore, getStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const [showState, SetShowState] = useState(true);
    // 이전페이지에서 넘어온 값을 출력합니다
    // console.log("insert page parameter : %s", JSON.stringify(location.state));

    // Schema Info
    //FORM SCHEMA
    const SF_BT_M: TFormSchema = {
        id: "form_CgmeBtM",
        schema: {
            dclrNo: { type: "text", label: "L_DCLR_NO", edit: false },
            dcltTin: { type: "text", label: "L_DCLT_TIN" },
            dclrYy: { type: "text", label: "L_DCLR_YY" },
            prcsTpCd: { type: "text", label: "L_PRCS_TP_CD" },
            dclrSrno: { type: "text", label: "L_DCLR_SRNO" },
            dcltId: { type: "text", label: "L_DCLT_ID" },
            dcltNm: { type: "text", label: "L_DCLT_NM" },
            dcltTelno: { type: "text", label: "L_DCLT_TELNO" },
            crn: { type: "text", label: "L_CRN", required: true },
            mrn: { type: "text", label: "L_MRN", required: true },
            msn: { type: "text", label: "L_MSN", required: true },
            hsn: { type: "text", label: "L_HSN" },
            cstmOfceCd: { type: "code", label: "L_CSTM_OFCE_CD", area: "orgCd", popupSize: "md", required: true },
            tansadNo: { type: "text", label: "L_TANSAD_NO", required: true },
            tansadCstmOfceCd: { type: "text", label: "L_TANSAD_CSTM_OFCE_CD", required: true },
            tansadYy: { type: "text", label: "L_TANSAD_YY", required: true },
            tansadSrno: { type: "text", label: "L_TANSAD_SRNO", required: true },
            regmCd: { type: "text", label: "L_REGM_CD", required: true },
            gpcCd: { type: "text", label: "L_GPC_CD", required: true },
            dscgPlcCd: { type: "text", label: "L_DSCG_PLC_CD" },
            prcssStatCd: { type: "text", label: "L_PRCSS_STAT", edit: false },
            prcssDtm: { type: "text", label: "L_PRCSS_DTM" },
            prcssId: { type: "text", label: "L_PRCSS_ID" },
            prcssYn: { type: "text", label: "L_PRCSS_YN" },
            prcssYnDt: { type: "text", label: "L_PRCSS_YN_DT" },
            blNo: { type: "text", label: "L_BL_NO", required: true },
            godsDesc: { type: "textarea", label: "L_GODS_DESC", edit: editable },
            blPckgNo: { type: "number", label: "L_BL_PCKG_NO" },
            pckgUtCd: { type: "select", label: "L_PCKG_UT_CD" },
            blWght: { type: "number", label: "L_BL_WGHT", required: true },
            wghtUtCd: { type: "select", label: "L_WGHT_UT_CD", required: true },
            trnsTpCd: { type: "text", label: "L_TRNS_TP_CD" },
            trptTpCd: { type: "select", label: "L_TRPT_TP_CD" },
            trsfStrtDt: { type: "date", label: "L_TRSF_STRT_DT", required: true },
            trsfEndDt: { type: "date", label: "L_TRSF_END_DT", required: true },
            trsfTpCd: { type: "text", label: "L_TRSF_TP_CD" },
            btBaseTpCd: { type: "select", label: "L_BT_BASE_TP_CD", required: true },
            trsfBaseNo: { type: "text", label: "L_REFF_NO", edit: editable },
            imppnTin: { type: "text", label: "L_IMPPN_TIN" },
            trsfBondOwrTpCd: { type: "select" },
            trsfBondOwrTin: { type: "text" },
            vhclAsnmtTpCd: { type: "radio", label: "L_VHCL_ASNMT_TP_CD" },
            oilYn: { type: "radio", label: "L_OIL_YN" },
            preDclrNo: { type: "text", label: "L_PRE_DCLR_NO" },
            btTpCd: { type: "text", label: "L_BT_TP_CD" },
            sctTpCd: { type: "text", label: "L_SCT_TP_CD" },
            bondUsdVal: { type: "number", label: "L_BOND_USD_VAL" },
            dstnCntyCd: { type: "text", label: "L_DSTN_CNTY_CD" },
            dptrWrhsCd: { type: "code", label: "L_DPTR_WRHS_CD", area: "coCd", required: true },
            dstnWrhsCd: { type: "code", label: "L_DSTN_WRHS_CD", area: "coCd" },
            viaCntyCd1: { type: "text", label: "L_VIA_CNTY_CD_1" },
            viaCntyCd2: { type: "text", label: "L_VIA_CNTY_CD_2" },
            viaCntyCd3: { type: "text", label: "L_VIA_CNTY_CD_3" },
            viaCntyCd4: { type: "text", label: "L_VIA_CNTY_CD_4" },
            via1stWrhsCd: { type: "text", label: "L_VIA_1ST_WRHS_CD" },
            via2ndWrhsCd: { type: "text", label: "L_VIA_2ND_WRHS_CD" },
            v1stViaEndDt: { type: "text", label: "L_1ST_VIA_END_DT" },
            v2ndViaEndDt: { type: "text", label: "L_2ND_VIA_END_DT" },
            rctgYn: { type: "text", label: "L_RCTG_YN" },
            bondCurrCd: { type: "text", label: "L_BOND_CURR_CD" },
            bondVal: { type: "number", label: "L_BOND_VAL" },
            trsfBondTpCd: { type: "select", label: "L_TRSF_BOND_TP_CD" },
            trsfBondNo: { type: "text", label: "L_TRSF_BOND_NO" },
            wrhsBondTpCd: { type: "select", label: "L_WRHS_BOND_TP_CD" },
            wrhsBondNo: { type: "text", label: "L_WRHS_BOND_NO" },
            cntrCnt: { type: "number", label: "L_CNTR_CNT" },
            ruteId: { type: "text", label: "L_RUTE_ID", rightButton: { icon: "search" } },
            exitBrdrPntCd: { type: "text", label: "L_EXIT_BRDR_PNT_CD" },
            sbmtDt: { type: "text", label: "L_SBMT_DT" },
            autrId: { type: "text", label: "L_AUTR_ID" },
            audtDt: { type: "text", label: "L_AUDT_DT" },
            autrOpinCn: { type: "text", label: "L_AUTR_OPIN_CN" },
            t1No: { type: "text", label: "L_T1_NO", edit: false },
            t1ErrDt: { type: "text", label: "L_T1_ERR_DT" },
            delYn: { type: "text", label: "L_DEL_YN" },
            // frstRegstId: { type: "text", label: "L_FRST_REGST_ID", required: true },
            // frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM", required: true },
            // lastMdfrId: { type: "text", label: "L_LAST_MDFR_ID", required: true },
            // lastMdfyDtm: { type: "text", label: "L_LAST_MDFY_DTM", required: true },
        },
    };

    const SG_BT_M_VEHCLE_LIST: WijmoSchemaType = {
        id: "vehicleGrid",
        options: { isReadOnly: true, checkbox: true },
        head: [
            { cells: [{ header: "Driver Name", binding: "drvrNm" }] },
            { cells: [{ header: "License No", binding: "drvrLcneNo" }] },
            { cells: [{ header: "Driving Type", binding: "vhclOwrYn" }] },
            { cells: [{ header: "Vehicle No", binding: "vhclNo" }] },
            { cells: [{ header: "Trailer / Semi-Traile" }] },
            { cells: [{ header: "Sub T1", binding: "subT1No" }] },
            { cells: [{ header: "Bond Value", binding: "bondVal" }] },
            { cells: [{ header: "Package / Weight" }] },
            { cells: [{ header: "Total Container" }] },
        ],
        body: [
            {
                cells: [
                    {
                        render: (celData) => {
                            return <span className="underline">{`${celData.rowValues.drvrNm}`}</span>;
                        },
                        binding: "drvrNm",
                        width: 150,
                    },
                ],
            },
            { cells: [{ binding: "drvrLcneNo", width: 100 }] },
            { cells: [{ binding: "vhclOwrYn", width: 100 }] },
            { cells: [{ binding: "vhclNo", width: 150 }] },
            {
                cells: [
                    {
                        render: (cellData) => {
                            const trlrNo = comnUtils.replaceEmpty(cellData.rowValues.trlrNo);
                            const semiTrlrNo = comnUtils.replaceEmpty(cellData.rowValues.semiTrlrNo);
                            const data = trlrNo + (semiTrlrNo !== "" ? " / " + semiTrlrNo : "");
                            // console.log("trlrNo :::: %s", trlrNo);
                            // console.log("semiTrlrNo :::: %s", semiTrlrNo);
                            // console.log("data :::: %s", data);
                            return `${data}`;
                        },
                        binding: "vhclNo",
                        width: "*",
                    },
                ],
            },
            { cells: [{ binding: "subT1No", width: 150 }] },
            { cells: [{ binding: "bondVal", width: 100 }] },
            {
                cells: [
                    {
                        render: (cellData) => {
                            const loadPckgNo = comnUtils.replaceEmpty(`${cellData.rowValues.loadPckgNo}`);
                            const pckgUtCd = comnUtils.replaceEmpty(`${cellData.rowValues.pckgUtCd}`);
                            const loadWght = comnUtils.replaceEmpty(`${cellData.rowValues.loadWght}`);
                            const wghtUtCd = comnUtils.replaceEmpty(`${cellData.rowValues.wghtUtCd}`);

                            return loadPckgNo + " " + pckgUtCd + " / " + loadWght + " " + wghtUtCd;
                        },
                        binding: "",
                        width: "*",
                    },
                ],
            },
            {
                cells: [
                    {
                        render: (cellData) => {
                            return cellData.rowValues.cntrList?.length || 0;
                        },
                        binding: "",
                        width: 100,
                    },
                ],
            },
        ],
    };

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        btMDto: useForm({
            defaultSchema: SF_BT_M,
            defaultValues: {
                prcsTpCd: "T",
                vhclAsnmtTpCd: "W",
                trsfStrtDt: comnUtils.getDate(),
                trsfEndDt: comnUtils.getDate({ d: +7 }),
                delYn: "N",
                // frstRegstId: "SYSTEM",
                // lastMdfrId: "SYSTEM",
            },
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        btMVhclList: useWijmo({
            defaultSchema: SG_BT_M_VEHCLE_LIST,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // 임시저장.
        saveCgmeBtInfo: useFetch({
            api: (data: any) => APIS.saveCgmeBtInfo({ ...data }),
            onSuccess: (res_data) => {
                const resDclrNo = res_data.resDto.content.dclrNo;
                console.log("resDclrNo :::: %s", resDclrNo);
                toast.showToast({ type: "success", content: "msg.00003" });
                //navigate(`${URLS.cgme0303002s}/${resDclrNo}`);
                handler.getCgmeBtDtl();
                if (showState === false) {
                    SetShowState(true);
                }
            },
            onError: () => {
                modal.openModal({ content: "msg.00006" });
            },
        }),
        getCgmeBtDtl: useFetch({
            api: (data: any) => APIS.getCgmeBtDtl(dclrNo),
            enabled: !!dclrNo,
            onSuccess: (data) => {
                // console.log("getCgmeBtDtl ====> : [" + JSON.stringify(data) + "]");
                // try {
                form.btMDto.setValues({
                    ...data.btMDto.content,
                });
                // } catch (error) {
                //     console.log(error);
                // }

                setPrcssStatCd(data.btMDto.content.prcssStatCd);

                grid.btMVhclList.resetData();

                setBtVhclList({
                    content: data.btMDto.content.btVhclList,
                    page: {
                        totalElements: data.btMDto.content.btVhclList ? data.btMDto.content.btVhclList.length : 0,
                    },
                });
            },
            onError: () => {},
            showToast: showState,
        }),
        deleteCgmeBtInfo: useFetch({
            api: (data: any) => APIS.deleteCgmeBtInfo(dclrNo),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "success" });
                handler.navigateToList();
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
        // 목록으로 이동
        navigateToList: () => navigate(URLS.cgme0303001q),
        getCgmeBtDtl: () => {
            fetch.getCgmeBtDtl.fetch();
        },
        // 임시저장
        saveCgmeBtInfo: form.btMDto.handleSubmit(
            () => {
                SetShowState(false);
                const data = { ...form.btMDto.getFormValues(), btVhclList: grid.btMVhclList.getData() };
                modal.openModal({
                    content: "msg.00101",
                    onConfirm: () => {
                        fetch.saveCgmeBtInfo.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
        deleteCgmeBtInfo: () => {
            // console.log("data :::: >>>>" + data);
            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    fetch.deleteCgmeBtInfo.fetch();
                },
            });
        },
        deleteCgmeBtVhcl: () => {
            const selList: any[] = grid.btMVhclList.getChecked() || [];
            if (comnUtils.isEmpty(selList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    grid.btMVhclList.deleteRow();
                    handler.buildVhclDataList(dclrNo, 0, "D", null, grid.btMVhclList.getData());
                },
            });
        },
        /**
         * !==등록/수정된 차량정보에 대하여 목록을 갱신한다.==!
         * @param dclrNo
         * @param vhclSrno
         * @param mode
         * @param inputData
         */
        buildVhclDataList: (dclrNo: any, vhclSrno: any, mode: "I" | "U" | "D", inputData: any, vhclGridData: any) => {
            let copyBtVhclLists: Array<any> = [];
            const orgBtVhclList = getStore(pgeUid).btVhclList.content;
            // 수정인 경우 처리.
            if (mode === "U") {
                if (!comnUtils.isEmptyArray(orgBtVhclList)) {
                    for (let i = 0; i < orgBtVhclList.length; i++) {
                        // ReadOnly로 된 데이터를 복사처리 한다.
                        const copyData = Object.assign({}, orgBtVhclList[i]);
                        if (orgBtVhclList[i].dclrNo === dclrNo && orgBtVhclList[i].vhclSrno === vhclSrno) {
                            cgmUtils.setObjectValues(inputData, copyData);
                        }
                        copyBtVhclLists.push(copyData);
                    }
                }
            } else if (mode === "I") {
                copyBtVhclLists = lodash.cloneDeep(orgBtVhclList);
                copyBtVhclLists.push(inputData);
            } else {
                copyBtVhclLists = lodash.cloneDeep(vhclGridData);
            }
            console.log(copyBtVhclLists);
            setBtVhclList({
                content: copyBtVhclLists,
                page: {
                    totalElements: copyBtVhclLists ? copyBtVhclLists.length : 0,
                },
            });
        },
        addCgmeBtVhcl: () => {
            openPopup({
                url: URLS.cgme0303007q,
                size: "lg",
                params: comnUtils.toGetParams({ dclrNo: dclrNo, vhclSrno: 0 }),
                callback: ({ data = Array<any> }) => {
                    // console.log(data);
                    handler.buildVhclDataList(data[0].dclrNo, data[0].vhclSrno, "I", data[0], null);
                },
            });
        },
        click_vhcl_list_grid: {
            drvrNm: (data: any) => {
                // console.log("data=====> ,%s", JSON.stringify(data.rowValues));
                // 현재 기능은 팝업창 기준으로 되어 있어서 POST방식으로 데이터 전체를 보내는 방법은 미사용(모달레이어 방식)
                // 차후 모달 레이어로 하는 경우 이벤트 핸들러를 모달로 보내어 처리할 수 있도록 함.
                // modal.openModal({ content: <CGME0303007Q data={data.rowValues} />, draggable: true, size: "lg" });
                // return;
                // console.log(getStore(pgeUid).btVhclList);

                // console.log(btVhclLists);
                openPopup({
                    url: URLS.cgme0303007q,
                    params: comnUtils.toGetParams({ dclrNo: data.rowValues.dclrNo, vhclSrno: data.rowValues.vhclSrno }),
                    callback: ({ data = Array<any> }) => {
                        const vhclList = grid.btMVhclList.getData();
                        if (comnUtils.isEmptyArray(vhclList)) {
                            for (let i = 0; i < vhclList.length; i++) {
                                if (vhclList[i].dclrNo === data[0].dclrNo && vhclList[i].vhclSrno === data[0]) {
                                    const copyData = Object.assign({}, vhclList[i]);
                                    cgmUtils.setObjectValues(data[0], copyData);
                                    copyData.vhclSrno = i;
                                    copyData.tripNo = i;
                                    grid.btMVhclList.updateRow(copyData);
                                }
                            }
                        }
                        // console.log(data);
                        // if (!comnUtils.isEmptyArray(data)) {
                        //     handler.buildVhclDataList(data[0].dclrNo, data[0].vhclSrno, "U", data[0], null);
                        // }
                    },
                });
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        console.log("dclrNo ::: %s", dclrNo);
        if (!comnUtils.isEmpty(dclrNo)) {
            // 신고서 번호가 있는 경우 처리.
            // fetch.getCgmeBtDtl.fetch();
            handler.getCgmeBtDtl();
        } else {
            // 신고서 번호가 없는 경우에는 신규 입력으로 간주하여 받아온 파라미터를 기본 설정한다.
            cgmUtils.setFormValues(location.state, form.btMDto);
        }
    }, []);

    /**
     * != 처리상태코드에 따른 화면 처리 ==!
     */
    useEffect(() => {
        if (prcssStatCd === PRCS_TP_CD.APPROVED) {
            form.btMDto.setEditable(false);
            // 입력불가
            // 그리드 체크박스 제거, 버튼 없어야 되고
            // editable
        } else {
            form.btMDto.setSchemaAll(SF_BT_M);
        }
    }, [prcssStatCd]);

    useEffect(() => {
        /*
         * state 값이 변경되었을때 그리드 내부에서 state 값을 참조하는 경우
         * store 에 변경시 값을 저장하여 getStore 메소드로 필요한 곳에서 현재의 값을 참조하여 사용
         */
        setStore(pgeUid, { btVhclList: btVhclList });
    }, [btVhclList]);

    return (
        <>
            <Group>
                <Group.Body>
                    <Group.Title title={"Bonded Transportation Declaration"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.cstmOfceCd} controlSize={10}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.dclrNo}></Group.Control>
                            <Group.Control {...form.btMDto.schema.prcssStatCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.trsfBaseNo}></Group.Control>
                            <Group.Control {...form.btMDto.schema.t1No}></Group.Control>
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title={"Transit Information"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control
                                {...form.btMDto.schema.btBaseTpCd}
                                options={[
                                    { label: "IM7", value: "IM7" },
                                    { label: "IM8", value: "IM8" },
                                    { label: "IM4", value: "IM4" },
                                    { label: "EX1", value: "EX1" },
                                    { label: "EX2", value: "EX2" },
                                    { label: "EX3", value: "EX3" },
                                ]}
                            ></Group.Control>
                            <Group.Control
                                {...form.btMDto.schema.trptTpCd}
                                options={[
                                    { label: "1. Sea transport", value: "1. Sea transport" },
                                    { label: "2. Rail transport", value: "2. Rail transport" },
                                    { label: "3. Road transport", value: "3. Road transport" },
                                    { label: "4. Air transport", value: "4. Air transport" },
                                    { label: "5. Postal transport", value: "5. Postal transport" },
                                    { label: "6. Multimodal transport", value: "6. Multimodal transport" },
                                    { label: "7. Transport on installation", value: "7. Transport on installation" },
                                    { label: "8. Inland waterways transport", value: "8. Inland waterways transport" },
                                    { label: "9. Mode unknown", value: "9. Mode unknown" },
                                ]}
                            ></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.dptrWrhsCd}></Group.Control>
                            <Group.Control {...form.btMDto.schema.dstnWrhsCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.trsfStrtDt}></Group.Control>
                            <Group.Control {...form.btMDto.schema.trsfEndDt}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.ruteId} controlSize={10}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.viaCntyCd1} controlSize={10}></Group.Control>
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title={"Bond Information"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.bondVal}></Group.Control>
                            <Group.Label label={"L_TRSF_BOND_OWR_TIN"}></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btMDto.schema.trsfBondOwrTin} controlSize={2}></Group.Control>
                                <Group.Control
                                    {...form.btMDto.schema.trsfBondOwrTpCd}
                                    options={[{ label: "CFA", value: "CFA" }]}
                                    controlSize={4}
                                ></Group.Control>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_TRSF_BOND_NO"}></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btMDto.schema.trsfBondNo}></Group.Control>
                                <Group.Control
                                    {...form.btMDto.schema.trsfBondTpCd}
                                    options={[{ label: "CB3", value: "CB3" }]}
                                ></Group.Control>
                            </Group.Col>
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title={"Cargo Information"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.crn}></Group.Control>
                            <Group.Control {...form.btMDto.schema.blNo}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.btMDto.schema.godsDesc} controlSize={10}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_BL_PCKG_NO"}></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btMDto.schema.blPckgNo}></Group.Control>
                                <Group.Control
                                    {...form.btMDto.schema.pckgUtCd}
                                    options={[{ label: "Pacakge", value: "PK" }]}
                                ></Group.Control>
                            </Group.Col>
                            <Group.Label label={"L_BL_WGHT"}></Group.Label>
                            <Group.Col>
                                <Group.Control {...form.btMDto.schema.blWght}></Group.Control>
                                <Group.Control
                                    {...form.btMDto.schema.wghtUtCd}
                                    options={[{ label: "KG", value: "KG" }]}
                                ></Group.Control>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                {...form.btMDto.schema.vhclAsnmtTpCd}
                                options={[
                                    { label: "Whole Assignment", value: "W" },
                                    { label: "Partial Assignment", value: "P" },
                                ]}
                            ></Group.Control>
                            <Group.Control
                                {...form.btMDto.schema.oilYn}
                                options={[
                                    { label: "Y", value: "Y" },
                                    { label: "N", value: "N" },
                                ]}
                            ></Group.Control>
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Title title={"Vehicle Information"} titleSize={2}></Group.Title>
                    <Layout direction="row">
                        <Layout.Right>
                            <Button role="gridAdd" onClick={handler.addCgmeBtVhcl}></Button>
                            <Button role="gridDelete" onClick={handler.deleteCgmeBtVhcl}></Button>
                        </Layout.Right>
                    </Layout>
                    <Wijmo
                        {...grid.btMVhclList.grid}
                        data={btVhclList}
                        onCellClick={handler.click_vhcl_list_grid}
                    ></Wijmo>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Layout>
                        <Layout.Left>
                            <Button role="list" onClick={handler.navigateToList}></Button>
                        </Layout.Left>
                        {(prcssStatCd === PRCS_TP_CD.NONE || prcssStatCd === PRCS_TP_CD.REGISTERED) && (
                            <>
                                <Layout.Right>
                                    <Button
                                        role="save"
                                        onClick={() => {
                                            handler.saveCgmeBtInfo();
                                        }}
                                    ></Button>
                                    <Button role="submit"></Button>
                                    <Button
                                        role="delete"
                                        onClick={() => {
                                            handler.deleteCgmeBtInfo();
                                        }}
                                    ></Button>
                                </Layout.Right>
                            </>
                        )}
                    </Layout>
                </Group.Body>
            </Group>
        </>
    );
};

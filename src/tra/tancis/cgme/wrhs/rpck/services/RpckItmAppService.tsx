import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

/*
 * Repacking Item Declaration Service
 * !== 재포장 BL(품목) 신고서 기능 서비스 ==!
 */

/*
 * @ BASE
 * @ 서비스에서 사용하는 기본 정보 세팅
 * @ path : 화면들의 기본 웹 경로
 * @ api : 사용하는 api 의 기본 주소
 * @ api 주소가 여러개일 경우 _ 로구분하여 의미에 맞게 카멜표기업으로 표시 : api_clr
 * @ nodes : 화면의 Page.Navigation 에서 사용하는 기본 결로 Array
 */
export const BASE = {
    path: `${comnEnvs.base}/wrhs/rpck`,
    api: `${process.env.REACT_APP_API_CGM}/api/v1/cgm/wrhs/rpck/rpck-itm-app`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/wrhs/", label: "L_MNFS_MGMT" },
        { path: "/wrhs/rpck", label: "L_RPCK_BL" },
    ],
};

/*
 * @ URLS
 * @ 화면에서 사용하는 주소들 정의
 * @ 해당화면의 컴포넌트명 대문자로 정의
 */
export const URLS = {
    cgme0411001q: `${BASE.path}/cgme0411001q`, // Repacking Item Declaration List !== 재포장 BL(품목) 신고서 목록 ==!
    cgme0411002s: `${BASE.path}/cgme0411002s`, // Repacking Item Declaration Registration !== 재포장 BL(품목) 신고서 등록 ==!
    cgme0411003q: `${BASE.path}/cgme0411003q`, // Repacking Item Declaration Item List !== 재포장 BL(품목) 신고서 품목 목록 ==!
};

/*
 * @ APIS
 * @ 화면에서 사용하는 api 정의
 */
export const APIS = {
    // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
    getRpckItmAppList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    getRpckItmApp: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    saveRpckItmApp: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    submitRpckItmApp: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
    deleteRpckItmApp: (dclrNos: any) => {
        return api.delete(`${BASE.api}/${dclrNos}`);
    },
};

/*
 * @ 그리드 스키마 정의
 * @ 화면에서 사용하는 그리드 구조 정의
 * @ SG_ 로 시작 (Schema grid)
 * @ SQ_[그리드명 메타 대문자, "_" 로 구분 ]
 */

// Schema of Repacking Item Application List Grid !== 재포장 품목 신청서 목록 그리드 스키마 ==!
export const SG_RPCK_ITM_APP_LIST: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true, checkbox: true },
    head: [
        { cells: [{ header: "L_DCLR_NO" }] },
        { cells: [{ header: "L_WRHS", binding: "wrhsCd" }] },
        { cells: [{ header: "L_MRN", binding: "mrn" }] },
        { cells: [{ header: "L_MSN", binding: "msn" }] },
        { cells: [{ header: "L_MBL_NO", binding: "mblNo" }] },
        { cells: [{ header: "L_GODS_DESC", binding: "godsDesc" }] },
        { cells: [{ header: "L_PCKG_NO", binding: "blPckgNo" }] },
        { cells: [{ header: "L_GWGHT", binding: "blGwght" }] },
        { cells: [{ header: "L_PRCSS_STAT", binding: "prcssStatCd" }] },
    ],
    body: [
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.dcltTin}-${cellData.rowValues.dclrYy}-${cellData.rowValues.prcsTpCd}-${cellData.rowValues.dclrSrno}`;
                    },
                    binding: `dclrNo`,
                    width: 200,
                },
            ],
        },
        {
            cells: [{ binding: "wrhsCd", width: 150 }],
        },
        {
            cells: [{ binding: "mrn", width: 100 }],
        },
        {
            cells: [{ binding: "msn", width: 100 }],
        },
        {
            cells: [{ binding: "mblNo", width: 100 }],
        },
        {
            cells: [{ binding: "godsDesc", width: "*" }],
        },
        {
            cells: [{ binding: "blPckgNo", width: 100 }],
        },
        {
            cells: [{ binding: "blGwght", width: 100 }],
        },
        {
            cells: [{ binding: "prcssStatCd", width: 100 }],
        },
    ],
};

/*
 * @ Form 스키마 정의
 * @ 화면에서 사용하는 Form 구조 정의
 * @ SF_ 로 시작 (Schema form)
 * @ SF_[Form 이름 메타 대문자, "_" 로 구분 ]
 * @ 검색폼은 _SRCH 로 구분
 */

// Schema of Repacking Item Application List Search Form !== 재포장 품목 신청서 목록 검색 폼 스키마 ==!
export const SF_RPCK_ITM_APP_SRCH: TFormSchema = {
    id: "form_RpckItmAppSrch",
    schema: {
        frstRgsrDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "strtDt", required: true },
            end: { name: "endDt" },
            rangeButton: 0,
            controlSize: 10,
        },
        mrn: { type: "text", label: "L_MRN" },
        prcssStatCd: {
            type: "checkbox",
            label: "L_PRCSS_STAT",
            area: "comnCd",
            controlSize: 10,
            comnCd: "COM_0100",
            all: true,
        },
    },
};

export const SF_RPCK_ITM_APP: TFormSchema = {
    id: "form_CgmeRpckItmM",
    schema: {
        rprtNo: { type: "text", label: "L_RPRT_NO" },
        dcltTin: { type: "text", label: "L_DCLT_TIN" },
        dclrYy: { type: "text", label: "L_DCLR_YY" },
        prcsTpCd: { type: "text", label: "L_PRCS_TP_CD" },
        dclrSrno: { type: "text", label: "L_DCLR_SRNO" },
        prcssStatCd: { type: "text", label: "L_PRCSS_STAT", edit: false },
        prcssDt: { type: "text", label: "L_PRCSS_DT" },
        prcssId: { type: "text", label: "L_PRCSS_ID" },
        cstmOfceCd: { type: "text", label: "L_CSTM_OFCE_CD" },
        mrn: { type: "text", label: "L_MRN" },
        mblNo: { type: "text", label: "L_MBL_NO", edit: false },
        crn: { type: "text", label: "L_CRN", edit: false },
        msn: { type: "text", label: "L_MSN" },
        cagClsfCd: { type: "select", label: "L_CAG_CLSF", area: "comnCd", comnCd: "CAG_0006" },
        blTpCd: { type: "text", label: "L_BL_TP_CD" },
        shagCd: { type: "text", label: "L_SHAG_CD" },
        exppnTin: { type: "text", label: "L_EXPPN_TIN" },
        exppnNm: { type: "text", label: "L_EXPPN_NM", rightButton: { icon: "search" } },
        exppnTelno: { type: "text", label: "L_EXPPN_TELNO" },
        exppnAddr: { type: "text", label: "L_EXPPN_ADDR" },
        cnsiTin: { type: "text", label: "L_CNSI_TIN", required: true },
        cnsiNm: { type: "text", label: "L_CNSI_NM", rightButton: { icon: "search" } },
        cnsiTelno: { type: "text", label: "L_CNSI_TELNO" },
        cnsiAddr: { type: "text", label: "L_CNSI_ADDR" },
        ntprTin: { type: "text", label: "L_NTPR_TIN" },
        ntprNm: { type: "text", label: "L_NTPR_NM", rightButton: { icon: "search" } },
        ntprTelno: { type: "text", label: "L_NTPR_TELNO" },
        ntprAddr: { type: "text", label: "L_NTPR_ADDR" },
        godsDesc: { type: "text", label: "L_GODS_DESC" },
        blPckgNo: { type: "number", required: true },
        pckgUtCd: { type: "select", required: true, select: true, area: "comnCd", comnCd: "CAG_0018" },
        blGwght: { type: "number", label: "L_BL_GWGHT", rightText: "KG", size: 4, thousandSeparator: true },
        gwghtUtCd: { type: "text", label: "L_GWGHT_UT_CD" },
        blNwght: { type: "text", label: "L_BL_NWGHT", rightText: "KG", size: 4, thousandSeparator: true },
        nwghtUtCd: { type: "text", label: "L_NWGHT_UT_CD" },
        blGvlm: { type: "text", label: "L_BL_GVLM" },
        vlmUtCd: { type: "text", label: "L_VLM_UT_CD" },
        loadPortCd: { type: "code", label: "L_LOAD_PORT", required: true, area: "portCd", maxLength: 3 },
        dstnPlcCd: { type: "code", label: "L_DSTN_PLC", required: true, area: "cityCd", maxLength: 3, popupSize: "md" },
        dlvrPlcCd: { type: "text", label: "L_DLVR_PLC" },
        imdgCd: { type: "text", label: "L_IMDG_CD" },
        invcVal: { type: "text", label: "L_INVC_VAL" },
        invcCurrCd: { type: "text", label: "L_INVC_CURR_CD" },
        frghCrge: { type: "text", label: "L_FRGH_CRGE" },
        frghCurrCd: { type: "text", label: "L_FRGH_CURR_CD" },
        wrhsCd: { type: "code", label: "L_WRHS", edit: false },
        sbmtDt: { type: "text", label: "L_SBMT_DT" },
        autrId: { type: "text", label: "L_AUTR_ID" },
        audtDt: { type: "text", label: "L_AUDT_DT" },
        audtRsltCn: { type: "text", label: "L_AUDT_RSLT_CN" },
        exctYn: { type: "text", label: "L_EXCT_YN" },
        dcltId: { type: "text", label: "L_DCLT_ID" },
        dcltNm: { type: "text", label: "L_DCLT_NM" },
        dcltTelno: { type: "text", label: "L_DCLT_TELNO" },
        bondVal: { type: "text", label: "L_BOND_VAL" },
        oilTpCd: { type: "text", label: "L_OIL_TP_CD" },
        pckgTpCd: { type: "select", label: "L_PCKG_TP", area: "comnCd", comnCd: "CAG_0018" },
        delYn: { type: "text", label: "L_DEL_YN" },
        frstRegstId: { type: "text", label: "L_FRST_REGST_ID" },
        frstRgsrDtm: { type: "text", label: "L_FRST_RGSR_DTM" },
        lastMdfrId: { type: "text", label: "L_LAST_MDFR_ID" },
        lastMdfyDtm: { type: "text", label: "L_LAST_MDFY_DTM" },
    },
};

export const SCHEMA_FORM_RPCK_ITM_APP_SEARCH = {
    id: "form",
    schema: {
        frstRgsrDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "frstRgsrDtmStrt" },
            end: { name: "frstRgsrDtmEnd" },
            rangeButton: 0,
            required: true,
        },
        mrn: { type: "text", label: "L_MRN" },
        prcssStatCd: { type: "checkbox", label: "L_PRCSS_STAT_CD" },
    },
};

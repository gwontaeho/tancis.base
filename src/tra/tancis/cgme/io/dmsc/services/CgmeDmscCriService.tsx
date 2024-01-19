import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base}/io/dmsc`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/cgme/io/dmsc/dmsc-gods-cri-rprt`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/io/", label: "SP/EPZ&MUB/Catering/Duty Free Shop" },
        { path: "/io/dmsc", label: "EPZ&MUB" },
    ],
};

export const URLS = {
    cgme0602001q: `${BASE.path}/cgme0602001q`,
    cgme0602002s: `${BASE.path}/cgme0602002s`,
    cgme0602006q: `${BASE.path}/cgme0602006q`,
};

export const APIS = {
    //내국 물품 반입 보고서 목록 조회
    getDmscGodsCriRprtList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // HS코드 조회
    getHsCdList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
};

//처리 상태 코드 [화물신고 유형코드 : 내국 물품 반입 보고서]
export const PRCS_TP_CD = {
    NONE: "", // 등록화면 초기값
};

/**
 * ==================================================================
 * [UI-CGME-0602-001Q] Domestic Goods Carry-In Report List
 * ==================================================================
 */
export const SF_DMSC_GODS_CRI_RPRT_SRCH: TFormSchema = {
    id: "form_srch_DmscGodsCriRprt",
    schema: {
        criDtRange: {
            type: "daterange",
            label: "L_CRI_DT",
            start: { name: "criDtFrom" },
            end: { name: "criDtTo" },
            controlSize: 10,
            rangeButton: 0,
            required: true,
        },
        rprtNo: { type: "text", label: "L_RPRT_NO" },
        prcssStatCd: {
            type: "checkbox",
            label: "L_PRCSS_STAT_CD",
            area: "comnCd",
            controlSize: 10,
            comnCd: "COM_0100",
            all: true,
            //[CHECK::Lucy] 2024.01.12 현재 공통 처리상태 값과 상이하여 변경필요.
            //required: true,
        },
    },
};

export const SG_DMSC_GODS_CRI_RPRT_LST: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true, checkbox: true },
    head: [
        { cells: [{ header: "L_RPRT_NO", binding: "rprtNo" }] },
        { cells: [{ header: "L_RPRT_DT", binding: "rprtDt" }] },
        { cells: [{ header: "L_CRI_DT", binding: "criDt" }] },
        { cells: [{ header: "L_GODS_NO", binding: "godsNo" }] },
        { cells: [{ header: "L_STTS", binding: "stts" }] },
    ],
    body: [
        {
            cells: [{ binding: "rprtNo", width: "*" }],
        },
        {
            cells: [{ binding: "sbmtDt", width: "*" }],
        },
        {
            cells: [{ binding: "criDt", width: "*" }],
        },
        {
            cells: [{ binding: "godsNo", width: "*" }],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        //[CHECK::Lucy] 코드명 가지고 오는 공통 로직 추가 예정
                        return `코드::${cellData.rowValues.prcssStatCd},코드명:${cellData.rowValues.prcssStatNm} [${cellData.rowValues.prcssDtm}]`;
                    },
                    binding: `stts`,
                    width: "2*",
                },
            ],
        },
    ],
};

/**
 * ==================================================================
 * [UI-CGME-0602-006Q] Target List For HS Code
 * ==================================================================
 */
// HS코드 조회 form
export const SF_HS_CD_SRCH: TFormSchema = {
    id: "form_srch_HsCd",
    schema: {
        dgt: {
            type: "radio",
            label: "L_DGT",
            options: [
                { label: "2 Digits", value: "2 Digits" },
                { label: "4 Digits", value: "4 Digits" },
                { label: "6 Digits", value: "6 Digits" },
                { label: "8 Digits", value: "8 Digits" },
                { label: "12 Digits", value: "12 Digits" },
            ],
            controlSize: 10,
        },
        hsCd: { type: "text", label: "L_HS_CD" },
        hsDesc: { type: "text", label: "L_HS_DESC" },
    },
};

// HS코드 Grid 정의
export const SG_HS_CD_LIST: WijmoSchemaType = {
    id: "grid",
    options: { isReadOnly: true, checkbox: false },
    head: [
        { cells: [{ header: "L_HS_CD", binding: "hsCd" }] },
        { cells: [{ header: "L_HS_DESC", binding: "hsDesc" }] },
    ],
    body: [
        {
            cells: [{ binding: "hsCd", width: 150 }],
        },
        {
            cells: [{ binding: "hsDesc", width: "*" }],
        },
    ],
};

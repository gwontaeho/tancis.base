import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base}/io/spcd`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/cgme/io/spcd/spcd-app`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/io/", label: "SP/EPZ&MUB/Catering/Duty Free Shop" },
        { path: "/io/spcd", label: "Specific Code" },
    ],
};

export const URLS = {
    cgme0601001q: `${BASE.path}/cgme0601001q`,
    cgme0601002s: `${BASE.path}/cgme0601002s`,
    cgme0602006q: `${comnEnvs.base}/io/dmsc/cgme0602006q`,
};

export const APIS = {
    // 특정코드 신청서 조회
    getSpcdAppList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // 특정코드 신청서 상세 조회
    getSpcdApp: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    //특정코드 신청서 임시 저장
    saveSpcdApp: (data: any) => {
        console.log(`[APIS::saveSpcdApp] ${JSON.stringify(data)}`);
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    //특정코드 신청서 제출
    submitSpcdApp: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    //특정코드 신청서 삭제
    deleteSpcdApp: (dclrNos: any) => {
        return api.delete(`${BASE.api}/${dclrNos}`);
    },
};

//처리 상태 코드 [화물신고 유형코드 : 특정 코드 신청서 SCA]
export const PRCS_TP_CD = {
    NONE: "", // 등록화면 초기값
    REGISTERED: "A01",
    SUBMITTED: "A04",
    RECEIVED: "D01",
    APPROVED: "D06",
    RETURNED: "R01", //[CHECK::Lucy] ASIS 미정의 추후 변경
    REJECTED: "D08",
    CANCELED: "C01", //[CHECK::Lucy] ASIS 미정의 추후 변경
    RECEIVED_ERROR: "A05",
};

/**
 * ==================================================================
 * [UI-CGME-0601-001Q] Specific Code Declaration List
 * ==================================================================
 */
// 특정코드 신청서 조회 form
export const SF_SPCD_APP_SRCH: TFormSchema = {
    id: "form_srch_SpcdApp",
    schema: {
        srchDtTp: {
            type: "select",
            select: false, //Select 선택 항목이 없는 select control option
            defaultValue: "rgsrDt",
            options: [
                { label: "Date of Register", value: "rgsrDt" },
                { label: "Date of Submission", value: "sbmtDt" },
            ],
        },
        srchDtTpDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "srchDtTpFrom" },
            end: { name: "srchDtTpTo" },
            rangeButton: 0,
        },
        dclrNo: { type: "text", label: "L_DCLR_NO" },
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

// 특정코드 신청서 Grid 정의
export const SG_SPCD_APP_LIST: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true, checkbox: false },
    head: [
        { cells: [{ header: "L_NO", binding: "no" }] },
        { cells: [{ header: "L_DCLR_NO", binding: "dclrNo" }] },
        { cells: [{ header: "L_SPCD_CNT", binding: "spcdCnt" }] },
        { cells: [{ header: "L_SBMT_DT", binding: "sbmtDt" }] },
        { cells: [{ header: "L_STTS", binding: "stts" }] },
    ],
    body: [
        {
            cells: [{ binding: "no", width: 50 }],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return (
                            <a className="underline" href="">
                                {`${cellData.rowValues.dclrNo}`}
                            </a>
                        );
                    },
                    binding: "dclrNo",
                    width: "*",
                },
            ],
        },
        {
            cells: [{ binding: "spcdCnt", width: 150 }],
        },
        {
            cells: [{ binding: "sbmtDt", width: "*" }],
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
 * [UI-CGME-0601-002S] Specific Code Declaration Registration
 * ==================================================================
 */
// 특정코드 신청서 상세 form
export const SF_SPCD_APP: TFormSchema = {
    id: "form_SpcdApp",
    schema: {
        dclrNo: {
            type: "text",
            label: "L_DCLR_NO",
            edit: false,
        },
        sbmtDt: {
            type: "text",
            label: "L_SBMT_DT",
            edit: false,
        },
        dclrRsn: {
            type: "textarea",
            label: "L_DCLR_RSN",
            required: true,
        },
        prcssStatCd: {},
        wrhsCd: {},
        prcsTpCd: {},
        dclrYy: {},
        dclrSrno: {},
    },
};

// 특정 코드 목록 Grid
export const SG_SPCD_LIST: WijmoSchemaType = {
    id: "grid",
    options: { checkbox: true, add: false, remove: false, isReadOnly: false },
    head: [
        { cells: [{ header: "L_SPCD", binding: "spcd" }] },
        { cells: [{ header: "L_HS_CD", binding: "hsCd", colspan: 2 }] },
        { cells: [{ header: "L_GODS_DESC", binding: "godsDesc" }] },
    ],
    body: [
        {
            cells: [{ binding: "spcd", width: 150, type: "text" }],
        },
        {
            cells: [{ binding: "hsCd", width: 150, type: "text" }],
        },
        {
            cells: [{ binding: "hsCdSrch", width: 30, type: "text", isReadOnly: true }],
        },
        {
            cells: [{ binding: "godsDesc", width: "*", type: "text" }],
        },
    ],
};

import { api } from "@/comn";
import { TFormSchema, WijmoSchemaType } from "@/comn/hooks";
import { comnUtils } from "@/comn/utils";
import { efmEnvs } from "@/tra/tancis/efme/comn";

/*
 * Offence Reprot Service
 * !== 위반 보고 기능 서비스 ==!
 */
export const BASE = {
    path: `${efmEnvs.base}/offe`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/efme/offe`,
    nodes: [
        { path: "/", label: "L_EFM_MGMT" },
        { path: "/offe/", label: "L_OFFE" },
    ],
};

/*
 * @ URLS
 * @ 화면에서 사용하는 주소들 정의
 * @ 해당화면의 컴포넌트명 대문자로 정의
 */
export const URLS = {
    efmi0104016q: `${BASE.path}/efmi0104016q`, // Offence Reprot List !== 위반 보고 목록 ==!
    efmi0104017s: `${BASE.path}/efmi0104017s`, // Offence Reprot !== 위반 보고 등록 ==!
};

/*
 * @ APIS
 * @ 화면에서 사용하는 api 정의
 */
export const APIS = {
    // Get Offence Reprot List !== 위반 보고 목록 조회 ==!
    getOffeList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // Get Offence Reprot !== 위반 보고 조회 ==!
    getOffe: (offeRottNo: any, page: number, size: number) => {
        return api.get(`${BASE.api}/${offeRottNo}?page=${page}&size=${size}`);
    },
};
/*
 * @ Form 스키마 정의
 * @ 화면에서 사용하는 Form 구조 정의
 * @ SF_ 로 시작 (Schema form)
 * @ SF_[Form 이름 메타 대문자, "_" 로 구분 ]
 * @ 검색폼은 _SRCH 로 구분
 */

// Schema of Offence Report List Search Form !== 위반 보고 목록 검색 폼 스키마 ==!
export const SF_OFFE_SRCH: TFormSchema = {
    id: "form_OffeSrch",
    schema: {
        srchSttsCd: {
            type: "select",
            label: "L_SRCH_STTS",
            controlSize: 3,
            all: true,
        },
        offeLb1: { type: "text", labelSize: 5 },
        rottLb: { type: "text", labelSize: 1 },
        rottTpCd: { type: "select" },
        stcd: { type: "select", controlSize: 2 },
        rottYy: { type: "text", controlSize: 1 },
        rottSrno: { type: "text", controlSize: 1 },
        ofndNm: { type: "text", label: "L_OFNDS_NM" },
        offeRprtDt: {
            type: "daterange",
            label: "L_OFFE_RPRT_DT",
            start: { name: "strtDt" },
            end: { name: "endDt" },
            controlSize: 7,
            rangeButton: 0,
        },
        prprOfcr: { type: "text", label: "L_PRPR_OFCR" },
    },
};

/*
 * @ 그리드 스키마 정의
 * @ 화면에서 사용하는 그리드 구조 정의
 * @ SG_ 로 시작 (Schema grid)
 * @ SQ_[그리드명 메타 대문자, "_" 로 구분 ]
 */

// Schema of Offence Report List Grid !== 위반 보고 목록 그리드 스키마 ==!
export const SG_OFFE_LIST: WijmoSchemaType = {
    id: "gridOffe",
    options: {
        pagination: "out",
        isReadOnly: true,
        checkbox: false,
    },
    head: [
        { cells: [{ header: "L_OFFE_R#" }] },
        { cells: [{ header: "L_OFFE_RPRT_DT" }] },
        { cells: [{ header: "L_OFDR_NM" }] },
        { cells: [{ header: "L_OWR_NM" }] },
    ],
    body: [
        { cells: [{ binding: "offeNo", width: "70*" }] },
        { cells: [{ binding: "offeRottDt", width: "30*" }] },
        { cells: [{ binding: "offeOfdrNm", width: "100*" }] },
        { cells: [{ binding: "offeOwrNm", width: "100*" }] },
    ],
};

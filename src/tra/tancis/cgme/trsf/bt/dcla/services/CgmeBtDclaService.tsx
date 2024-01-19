import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

/*
 * Bonded Transportation Declaration Service
 * !== 보세운송 신고서 기능 서비스 ==!
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
    path: `${comnEnvs.base}/trsf/bt/dcla`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/cgme/trsf/bt/dcla`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/trsf/", label: "Trasnfer" },
        { path: "/trsf/bt/dcla", label: "Transit" },
    ],
};

/*
 * @ URLS
 * @ 화면에서 사용하는 주소들 정의
 * @ 해당화면의 컴포넌트명 대문자로 정의
 */
export const URLS = {
    cgme0303001q: `${BASE.path}/cgme0303001q`, // Bonded Transportation Declaration List !== 보세운송 신고서 목록 ==!
    cgme0303002s: `${BASE.path}/cgme0303002s`, // Bonded Transportation Declaration !== 보세운송 신고서 상세 ==!
    cgme0303003q: `${BASE.path}/cgme0303003q`, // Search Bonded Tansportation Target(TANSAD)!== 보세운송 대상 조회(TANSAD) ==!
    cgme0303007q: `${BASE.path}/cgme0303007q`, // BT Vehicle Details !== 보세운송 차량 상세. ==!
};

/*
 * @ APIS
 * @ 화면에서 사용하는 api 정의
 */
export const APIS = {
    // Retrieve the List (Bonded transportation Declaration) !== 목록을 조회한다.(보세운송 신고서) ==!
    getCgmeBtList: (data: any, page: number, size: number) => {
        // const params11 = comnUtils.toGetParams(data);
        // console.log("params11 : %s", JSON.stringify(params11));
        return api.get(`${BASE.api}/getCgmeBtList?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // Retrieve the detail information (Bonded transportation Declaration) !== 상세 정보를 조회한다.(보세운송 신고서) ==!
    getCgmeBtDtl: (id: any) => {
        return api.get(`${BASE.api}/getCgmeBtDtl/${id}`);
    },
    // Save the Bonded transportation Declaration !==보세운송 신고서를 저장한다.===!
    saveCgmeBtInfo: (data: any) => {
        return api.post(`${BASE.api}/saveCgmeBtInfo`, {
            ...data,
        });
    },
    // Submit the Bonded transportation Declaration !==보세운송 신고서를 제출한다.===!
    submitCgmeBtInfo: (data: any) => {
        return api.post(`${BASE.api}/submitCgmeBtInfo`, {
            ...data,
        });
    },
    // Delete the Bonded transportation List !==보세운송 신고서 목록을 삭제한다.==!
    deleteCgmeBtList: (dclrNos: any) => {
        return api.delete(`${BASE.api}/deleteCgmeBtList/${dclrNos}`);
    },
    // Delete the Bonded transportation List !==보세운송 신고서를 삭제한다.==!
    deleteCgmeBtInfo: (dclrNo: any) => {
        return api.delete(`${BASE.api}/deleteCgmeBtInfo/${dclrNo}`);
    },
    //
    getTansadNoList: (data: any, page: number, size: number) => {
        // console.log("66666666");
        return api.get(`${BASE.api}/getTansadNoList?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    getBtVhclInfo: (dclrNo: any, vhclSrno: any) => {
        return api.get(`${BASE.api}/${dclrNo}/vhcl/${vhclSrno}`);
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

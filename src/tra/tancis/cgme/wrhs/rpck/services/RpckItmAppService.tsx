import { api } from "@/comn";
import { FormSchemaType, WijmoSchemaType } from "@/comn/hooks";

export const APIS = {
    getRpckItmList: (data: any, page: number, size: number) => {
        return api.get(`/cgme/wrhs/rpck/rpck-itm-apps?page=${page}&size=${size}`, {
            params: data,
        });
    },
    getRpckItm: (data: any, page: number, size: number) => {
        return api.get(`/cgme/wrhs/rpck/rpck-itm-apps?page=${page}&size=${size}`, {
            params: data,
        });
    },
    insertRpckItm: (data: any, page: number, size: number) => {
        return api.get(`/cgme/wrhs/rpck/rpck-itm-apps?page=${page}&size=${size}`, {
            params: data,
        });
    },
    deleteRpckItm: (data: any, page: number, size: number) => {
        return api.get(`/cgme/wrhs/rpck/rpck-itm-apps?page=${page}&size=${size}`, {
            params: data,
        });
    },
    updateRpckItm: (data: any, page: number, size: number) => {
        return api.get(`/cgme/wrhs/rpck/rpck-itm-apps?page=${page}&size=${size}`, {
            params: data,
        });
    },
};

export const SCHEMA_FORM_RPCK_ITM_APP = {
    id: "form",
    schema: {
        dcltTin: { type: "text", label: "L_DCLT_TIN" },
        dclrYy: { type: "text", label: "L_DCLR_YY" },
        prcsTpCd: { type: "text", label: "L_PRCS_TP_CD" },
        dclrSrno: { type: "text", label: "L_DCLR_SRNO" },
        prcssStatCd: { type: "text", label: "L_PRCSS_STAT_CD" },
        prcssDt: { type: "text", label: "L_PRCSS_DT" },
        prcssId: { type: "text", label: "L_PRCSS_ID" },
        cstmOfceCd: { type: "text", label: "L_CSTM_OFCE_CD" },
        mrn: { type: "text", label: "L_MRN" },
        mblNo: { type: "text", label: "L_MBL_NO" },
        msn: { type: "text", label: "L_MSN" },
        cagClsfCd: { type: "text", label: "L_CAG_CLSF_CD" },
        blTpCd: { type: "text", label: "L_BL_TP_CD" },
        shagCd: { type: "text", label: "L_SHAG_CD" },
        exppnTin: { type: "text", label: "L_EXPPN_TIN" },
        exppnNm: { type: "text", label: "L_EXPPN_NM" },
        exppnTelno: { type: "text", label: "L_EXPPN_TELNO" },
        exppnAddr: { type: "text", label: "L_EXPPN_ADDR" },
        cnsiTin: { type: "text", label: "L_CNSI_TIN" },
        cnsiNm: { type: "text", label: "L_CNSI_NM" },
        cnsiTelno: { type: "text", label: "L_CNSI_TELNO" },
        cnsiAddr: { type: "text", label: "L_CNSI_ADDR" },
        ntprTin: { type: "text", label: "L_NTPR_TIN" },
        ntprNm: { type: "text", label: "L_NTPR_NM" },
        ntprTelno: { type: "text", label: "L_NTPR_TELNO" },
        ntprAddr: { type: "text", label: "L_NTPR_ADDR" },
        godsDesc: { type: "text", label: "L_GODS_DESC" },
        blPckgNo: { type: "text", label: "L_BL_PCKG_NO" },
        pckgUtCd: { type: "text", label: "L_PCKG_UT_CD" },
        blGwght: { type: "text", label: "L_BL_GWGHT" },
        gwghtUtCd: { type: "text", label: "L_GWGHT_UT_CD" },
        blNwght: { type: "text", label: "L_BL_NWGHT" },
        nwghtUtCd: { type: "text", label: "L_NWGHT_UT_CD" },
        blGvlm: { type: "text", label: "L_BL_GVLM" },
        vlmUtCd: { type: "text", label: "L_VLM_UT_CD" },
        loadPortCd: { type: "text", label: "L_LOAD_PORT_CD" },
        dstnPlcCd: { type: "text", label: "L_DSTN_PLC_CD" },
        dlvrPlcCd: { type: "text", label: "L_DLVR_PLC_CD" },
        imdgCd: { type: "text", label: "L_IMDG_CD" },
        invcVal: { type: "text", label: "L_INVC_VAL" },
        invcCurrCd: { type: "text", label: "L_INVC_CURR_CD" },
        frghCrge: { type: "text", label: "L_FRGH_CRGE" },
        frghCurrCd: { type: "text", label: "L_FRGH_CURR_CD" },
        wrhsCd: { type: "text", label: "L_WRHS_CD" },
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
        pckgTpCd: { type: "text", label: "L_PCKG_TP_CD" },
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
        },
        mrn: { type: "text", label: "L_MRN" },
        prcssStatCd: { type: "checkbox", label: "L_PRCSS_STAT_CD" },
    },
};

import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { TFormSchema } from "@/comn/hooks";
import { WijmoSchemaType } from "@/comn/hooks";

export const BASE = {
    path: `${comnEnvs.base}/io/dmsc`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/cgme/io/stck/dmsc_gods_stck`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/io/", label: "SP/EPZ&MUB/Catering/Duty Free Shop" },
        { path: "/io/dmsc", label: "EPZ&MUB" },
    ],
};

export const URLS = {
    cgme0602021q: `${BASE.path}/cgme0602021q`,
    cgme0602022q: `${BASE.path}/cgme0602022q`,
};

export const APIS = {
    //내국 물품 재고 목록 조회
    getDmscGodsStckList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // 내국 물품 재고 상세 조회
    getDmscGodsStckInfo: (key: any) => {
        return api.get(`${BASE.api}/${key}`);
    },
};

/**
 * ==================================================================
 * [UI-CGME-0602-021Q] Domestic Goods Inventory List
 * ==================================================================
 */
export const SF_DMSC_GODS_STCK_SRCH: TFormSchema = {
    id: "form_srch_DmscGodsStck",
    schema: {
        criDtRange: {
            type: "daterange",
            label: "L_CRI_DT",
            start: { name: "criDtFrom" },
            end: { name: "criDtTo" },
            controlSize: 10,
            rangeButton: 0,
        },
        hsCd: { type: "text", label: "L_HS_CD" },
        spcd: { type: "text", label: "L_SPCD" },
        stck: {
            type: "checkbox",
            label: "L_STTS",
            options: [
                { label: "STOCK", value: "Y" },
                { label: "STRIKE-OFF", value: "N" },
            ],
            all: true,
        },
    },
};

export const SG_DMSC_GODS_STCK_LST: WijmoSchemaType = {
    id: "grid",
    options: { pagination: "out", isReadOnly: true, checkbox: true },
    head: [
        { cells: [{ header: "L_NO", binding: "no" }] },
        { cells: [{ header: "L_HS_CD", binding: "hsCd" }] },
        { cells: [{ header: "L_SPCD", binding: "spcd" }] },
        { cells: [{ header: "L_GODS_DESC", binding: "godsDesc" }] },
        { cells: [{ header: "L_CRI_DT", binding: "criDt" }] },
        { cells: [{ header: "L_QTY", binding: "qty" }] },
        { cells: [{ header: "L_WGHT", binding: "wght" }] },
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
                        return <span className="underline">{`${cellData.rowValues.hsCd}`}</span>;
                    },
                    binding: "hsCd",
                    width: 100,
                },
            ],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return <span className="underline">{`${cellData.rowValues.spcd}`}</span>;
                    },
                    binding: "spcd",
                    width: 100,
                },
            ],
        },
        {
            cells: [{ binding: "godsDesc", width: "*" }],
        },
        {
            cells: [{ binding: "criDt", width: 150 }],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.invnQty} ${cellData.rowValues.criQtyStstclUtCd}`;
                    },
                    binding: "qty",
                    width: 150,
                },
            ],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.invnWght} ${cellData.rowValues.criWghtUtCd}`;
                    },
                    binding: "wght",
                    width: 150,
                },
            ],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        if (cellData.rowValues.stckYn === "Y") return "STOCK";
                        else return "STRIKE-OFF";
                    },
                    binding: `stts`,
                    width: 100,
                },
            ],
        },
    ],
};

/**
 * ==================================================================
 * [UI-CGME-0602-022Q] Domestic Goods Inventory Details
 * ==================================================================
 */

export const SF_DMSC_GODS_STCK_DTL: TFormSchema = {
    id: "form_DmscGodsStckDtl",
    schema: {
        epzMub: { type: "text", label: "L_EPZ_MUB", edit: false },
        hsCd: { type: "text", label: "L_HS_CD", edit: false },
        spcd: { type: "text", label: "L_SPCD", edit: false },
        godsDesc: { type: "text", label: "L_GODS_DESC", edit: false },
    },
};

export const ST_DMSC_GODS_STCK_DTL = {
    id: "tabid",
    schema: [{ label: "L_CRI" }, { label: "L_CRO" }],
};

export const SG_DMSC_GODS_CRI_STCK: WijmoSchemaType = {
    id: "grid",
    options: { isReadOnly: true, checkbox: false },
    head: [
        { cells: [{ header: "L_NO", binding: "no" }] },
        { cells: [{ header: "L_RPRT_NO", binding: "rprtNo" }] },
        { cells: [{ header: "L_CRI_DT", binding: "criDt" }] },
        {
            cells: [
                { header: "L_CRI", colspan: 2 },
                { header: "L_QTY", binding: "qty" },
                { header: "L_WGHT", binding: "wght" },
            ],
        },
        { cells: [{ header: "L_CRI_BASE_NO", binding: "criBaseNo" }] },
    ],
    body: [
        {
            cells: [{ binding: "no", width: 50 }],
        },
        {
            cells: [{ binding: "rprtNo", width: 200 }],
        },
        {
            cells: [{ binding: "criDt", width: 80 }],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.criQty} ${cellData.rowValues.qtyStstclUtCd}`;
                    },
                    binding: "qty",
                    width: "*",
                },
            ],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.criWght} ${cellData.rowValues.wghtUtCd}`;
                    },
                    binding: "wght",
                    width: "*",
                },
            ],
        },
        {
            cells: [{ binding: "criBaseNo", width: 200 }],
        },
    ],
};

export const SG_DMSC_GODS_CRO_STCK: WijmoSchemaType = {
    id: "grid",
    options: { isReadOnly: true, checkbox: false },
    head: [
        { cells: [{ header: "L_NO", binding: "no" }] },
        { cells: [{ header: "L_RPRT_NO", binding: "rprtNo" }] },
        { cells: [{ header: "L_CRO_DT", binding: "croDt" }] },
        {
            cells: [
                { header: "L_CRO", colspan: 2 },
                { header: "L_QTY", binding: "qty" },
                { header: "L_WGHT", binding: "wght" },
            ],
        },
        { cells: [{ header: "L_CRO_BASE_NO", binding: "croBaseNo" }] },
    ],
    body: [
        {
            cells: [{ binding: "no", width: 50 }],
        },
        {
            cells: [{ binding: "rprtNo", width: 200 }],
        },
        {
            cells: [{ binding: "croDt", width: 80 }],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.croQty} ${cellData.rowValues.qtyStstclUtCd}`;
                    },
                    binding: "qty",
                    width: "*",
                },
            ],
        },
        {
            cells: [
                {
                    render: (cellData) => {
                        return `${cellData.rowValues.croWght} ${cellData.rowValues.wghtUtCd}`;
                    },
                    binding: "wght",
                    width: "*",
                },
            ],
        },
        {
            cells: [{ binding: "croBaseNo", width: 200 }],
        },
    ],
};

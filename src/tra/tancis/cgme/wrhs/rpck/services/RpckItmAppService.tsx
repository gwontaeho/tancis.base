import { api } from "@/comn";
import { FormSchemaType, WijmoSchemaType } from "@/comn/hooks";

export const APIS = {
    getRpckItmList: (data: any, page: number, size: number) => {
        return api.get(`/ptl-com/comn/comn-cds?page=${page}&size=${size}`, {
            params: data,
        });
    },
};
